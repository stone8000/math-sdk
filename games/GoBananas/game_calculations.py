from src.executables.executables import Executables


class GameCalculations(Executables):
    """Helper functions specific to expanding wilds sample game."""

    def print_prize_values(self):
        """Terminal display of prize value for superspin mode."""
        for idx, _ in enumerate(self.board):
            row_str = ""
            for idy, _ in enumerate(self.board[idx]):
                if self.board[idx][idy].name == "P":
                    row_str += str(self.board[idx][idy].prize).ljust(4)
                else:
                    row_str += "X".ljust(4)
            print(row_str)
        print("\n")
