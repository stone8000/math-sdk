from game_calculations import GameCalculations
from src.calculations.lines import Lines


class GameExecutables(GameCalculations):

    def evaluate_lines_board(self):
        """Populate win-data, record wins, transmit events.

        WildParty uses a single accumulating *global* multiplier (built up by Wild
        symbols during the free game), so wins are scaled with the ``global`` strategy.
        """
        self.win_data = Lines.get_lines(
            self.board,
            self.config,
            multiplier_method="global",
            global_multiplier=self.global_multiplier,
        )
        Lines.record_lines_wins(self)
        self.win_manager.update_spinwin(self.win_data["totalWin"])
        Lines.emit_linewin_events(self)

    def set_freegame_start_multiplier(self) -> None:
        """Starting free-game multiplier = number of paylines the triggering scatters
        all sit on, clamped to [1, freegame_start_mult_cap]."""
        scatters = self.special_syms_on_board.get("scatter", [])
        lines_through = 0
        for line in self.config.paylines.values():
            if scatters and all(line[s["reel"]] == s["row"] for s in scatters):
                lines_through += 1
        self.global_multiplier = max(1, min(self.config.freegame_start_mult_cap, lines_through))

    def accumulate_wild_multiplier(self) -> None:
        """Each Wild on a free-game board adds +1 to the global multiplier (cap applies)."""
        wild_count = len(self.special_syms_on_board.get("wild", []))
        for _ in range(wild_count):
            if self.global_multiplier < self.config.freegame_mult_cap:
                self.update_global_mult()
