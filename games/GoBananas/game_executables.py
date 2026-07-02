"""Executables related to updating expanding wilds and collecting prize values."""

import random
from copy import deepcopy
from game_calculations import GameCalculations
from src.calculations.statistics import get_random_outcome


class GameExecutables(GameCalculations):
    """Executable functions used for expanding wild game."""

    def update_with_existing_wilds(self) -> None:
        """Replace drawn boards with existing sticky-wilds."""
        updated_exp_wild = []
        for expwild in self.expanding_wilds:
            new_mult_on_reveal = get_random_outcome(
                self.get_current_distribution_conditions()["mult_values"][self.gametype]
            )
            expwild["mult"] = new_mult_on_reveal
            updated_exp_wild.append({"reel": expwild["reel"], "row": 0, "mult": new_mult_on_reveal})
            for row, _ in enumerate(self.board[expwild["reel"]]):
                self.board[expwild["reel"]][row] = self.create_symbol("W")
                self.board[expwild["reel"]][row].assign_attribute({"multiplier": new_mult_on_reveal})

    def assign_new_wilds(self, max_num_new_wilds: int):
        """Assign unused reels to have sticky symbol."""
        self.new_exp_wilds = []
        for _ in range(max_num_new_wilds):
            if len(self.avaliable_reels) > 0:
                chosen_reel = random.choice(self.avaliable_reels)
                chosen_row = random.choice([i for i in range(self.config.num_rows[chosen_reel])])
                self.avaliable_reels.remove(chosen_reel)

                wr_mult = get_random_outcome(
                    self.get_current_distribution_conditions()["mult_values"][self.gametype]
                )
                expwild_details = {"reel": chosen_reel, "row": chosen_row, "mult": wr_mult}
                self.board[expwild_details["reel"]][expwild_details["row"]] = self.create_symbol("W")
                self.board[expwild_details["reel"]][expwild_details["row"]].assign_attribute(
                    {"multiplier": wr_mult}
                )
                self.new_exp_wilds.append(expwild_details)

    # Superspin prize modes
    def check_for_new_prize(self) -> list:
        """Check for prizes landing on most recent reveal."""
        new_sticky_symbols = []
        for reel, _ in enumerate(self.board):
            for row, _ in enumerate(self.board[reel]):
                if (
                    self.board[reel][row].check_attribute("prize")
                    and (reel, row) not in self.existing_sticky_symbols
                ):
                    sym_details = {
                        "reel": reel,
                        "row": row,
                        "prize": self.board[reel][row].get_attribute("prize"),
                    }
                    new_sticky_symbols.append(sym_details)
                    self.sticky_symbols.append(deepcopy(sym_details))
                    self.existing_sticky_symbols.append((sym_details["reel"], sym_details["row"]))

        return new_sticky_symbols

    def replace_board_with_stickys(self) -> None:
        """replace with stickys and update special array."""
        for sym in self.sticky_symbols:
            self.board[sym["reel"]][sym["row"]] = self.create_symbol("P")
            self.board[sym["reel"]][sym["row"]].assign_attribute({"prize": sym["prize"]})

    def get_final_board_prize(self) -> dict:
        """Get final board win."""
        total_win = 0.0
        winning_pos = []
        for reel, _ in enumerate(self.board):
            for row, _ in enumerate(self.board[reel]):
                if self.board[reel][row].check_attribute("prize"):
                    total_win += self.board[reel][row].get_attribute("prize")
                    winning_pos.append(
                        {"reel": reel, "row": row, "value": self.board[reel][row].get_attribute("prize")},
                    )

        return_data = {"totalWin": total_win, "wins": winning_pos}
        return return_data
