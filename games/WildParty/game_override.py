from game_executables import GameExecutables


class GameStateOverride(GameExecutables):
    """
    Game-specific overrides/extensions of the universal state.py functions.
    """

    def reset_book(self):
        super().reset_book()

    def assign_special_sym_function(self):
        # WildParty has no per-symbol multiplier; the Wild/Scatter behaviour is driven
        # by the accumulating global multiplier and the line/scatter logic instead.
        self.special_symbol_functions = {}

    def check_repeat(self):
        super().check_repeat()
        if self.repeat is False:
            win_criteria = self.get_current_betmode_distributions().get_win_criteria()
            if win_criteria is not None and self.final_win != win_criteria:
                self.repeat = True
                return
            if win_criteria is None and self.final_win == 0:
                self.repeat = True
                return
