"""Game-specific configuration for WildParty (北極派對).

Spec source: in-game rule screens + games/WildParty/game120_info_20250208_.py

Symbols (id -> Stake name):
    1  W  Wild (polar bear) - substitutes all except Scatter
    2  S  Scatter (igloo)   - appears only on reels 3,4,5; 3 -> 5 free spins
    10 H1 orca   11 H2 seal   12 H3 wolf   13 H4 owl
    14 L1 A      15 L2 K      16 L3 Q      17 L4 J

Paytable: the in-game table is expressed as a per-line-bet multiplier. The math-sdk
lines engine sums each winning line directly as a multiple of the *total* bet, so the
displayed line odds are divided by the line count (35) to express total-bet multiples.

Free game: 5 free spins on a 3-scatter trigger. The free-game win multiplier is global
and accumulating: it starts at the number of paylines the triggering scatters lie on
(clamped 1..3) and gains +1 for every Wild that appears on a free-game spin, capped at
100x. 3 scatters during the free game retrigger +5 spins.
"""

import os
from src.config.config import Config
from src.config.distributions import Distribution
from src.config.betmode import BetMode


class GameConfig(Config):

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        super().__init__()
        self.game_id = "WildParty"
        self.provider_number = 0
        self.working_name = "Wild Party"
        self.wincap = 5000.0
        self.win_type = "lines"
        self.rtp = 0.9600
        self.construct_paths()

        # Free-game multiplier behaviour
        self.freegame_mult_cap = 100
        self.freegame_start_mult_cap = 3

        # Game Dimensions
        self.num_reels = 5
        self.num_rows = [3] * self.num_reels

        # Paytable: (kind, symbol) -> total-bet multiple (line odds / 35 lines).
        # Values are snapped to 0.1 increments because the RGS stores payouts as
        # integer "cents" (multiplier x 100) and requires multiples of 10.
        L = 35.0
        raw_odds = {
            "W": [54, 540, 1620],
            "H1": [27, 270, 810],
            "H2": [27, 135, 405],
            "H3": [9, 45, 135],
            "H4": [9, 36, 108],
            "L1": [6, 24, 72],
            "L2": [6, 18, 54],
            "L3": [3, 12, 24],
            "L4": [3, 9, 18],
        }

        def snap(value: float) -> float:
            """Round to 0.1, but never collapse a paying combo to 0."""
            return max(0.1, round(round(value / L, 1), 1))

        self.paytable = {}
        for sym, (p3, p4, p5) in raw_odds.items():
            self.paytable[(3, sym)] = snap(p3)
            self.paytable[(4, sym)] = snap(p4)
            self.paytable[(5, sym)] = snap(p5)

        # 35 paylines on a 5x3 grid (row 0=top, 1=middle, 2=bottom)
        line_patterns = [
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2],
            [0, 1, 2, 1, 0],
            [2, 1, 0, 1, 2],
            [1, 0, 0, 0, 1],
            [1, 2, 2, 2, 1],
            [0, 0, 1, 2, 2],
            [2, 2, 1, 0, 0],
            [1, 2, 1, 0, 1],
            [1, 0, 1, 2, 1],
            [0, 1, 1, 1, 0],
            [2, 1, 1, 1, 2],
            [0, 1, 0, 1, 0],
            [2, 1, 2, 1, 2],
            [1, 1, 0, 1, 1],
            [1, 1, 2, 1, 1],
            [0, 0, 2, 0, 0],
            [2, 2, 0, 2, 2],
            [0, 2, 0, 2, 0],
            [2, 0, 2, 0, 2],
            [1, 0, 1, 0, 1],
            [1, 2, 1, 2, 1],
            [0, 1, 2, 2, 2],
            [2, 1, 0, 0, 0],
            [0, 2, 2, 2, 0],
            [2, 0, 0, 0, 2],
            [1, 0, 2, 0, 1],
            [1, 2, 0, 2, 1],
            [0, 2, 1, 2, 0],
            [2, 0, 1, 0, 2],
            [0, 0, 1, 0, 0],
            [2, 2, 1, 2, 2],
            [1, 1, 2, 0, 1],
            [1, 1, 0, 2, 1],
        ]
        assert len({tuple(p) for p in line_patterns}) == 35, "paylines must be 35 distinct lines"
        self.paylines = {i + 1: pat for i, pat in enumerate(line_patterns)}

        self.include_padding = True
        self.special_symbols = {"wild": ["W"], "scatter": ["S"]}

        # 3 scatters -> 5 free spins (basegame trigger and freegame retrigger)
        self.freespin_triggers = {
            self.basegame_type: {3: 5},
            self.freegame_type: {3: 5},
        }
        self.anticipation_triggers = {
            self.basegame_type: min(self.freespin_triggers[self.basegame_type].keys()) - 1,
            self.freegame_type: min(self.freespin_triggers[self.freegame_type].keys()) - 1,
        }

        # Reels
        reels = {"BR0": "BR0.csv", "FR0": "FR0.csv", "WCAP": "FRWCAP.csv"}
        self.reels = {}
        for r, f in reels.items():
            self.reels[r] = self.read_reels_csv(os.path.join(self.reels_path, f))

        self.padding_reels[self.basegame_type] = self.reels["BR0"]
        self.padding_reels[self.freegame_type] = self.reels["FR0"]

        freegame_condition = {
            "reel_weights": {
                self.basegame_type: {"BR0": 1},
                self.freegame_type: {"FR0": 1},
            },
            "scatter_triggers": {3: 1},
            "force_wincap": False,
            "force_freegame": True,
        }

        basegame_condition = {
            "reel_weights": {self.basegame_type: {"BR0": 1}},
            "force_wincap": False,
            "force_freegame": False,
        }

        wincap_condition = {
            "reel_weights": {
                self.basegame_type: {"BR0": 1},
                self.freegame_type: {"FR0": 1, "WCAP": 5},
            },
            "scatter_triggers": {3: 1},
            "force_wincap": True,
            "force_freegame": True,
        }

        zerowin_condition = {
            "reel_weights": {self.basegame_type: {"BR0": 1}},
            "force_wincap": False,
            "force_freegame": False,
        }

        mode_maxwins = {"base": self.wincap, "bonus": self.wincap}
        self.bet_modes = [
            BetMode(
                name="base",
                cost=1.0,
                rtp=self.rtp,
                max_win=mode_maxwins["base"],
                auto_close_disabled=False,
                is_feature=True,
                is_buybonus=False,
                distributions=[
                    Distribution(
                        criteria="wincap",
                        quota=0.001,
                        win_criteria=mode_maxwins["base"],
                        conditions=wincap_condition,
                    ),
                    Distribution(criteria="freegame", quota=0.1, conditions=freegame_condition),
                    Distribution(criteria="0", quota=0.4, win_criteria=0.0, conditions=zerowin_condition),
                    Distribution(criteria="basegame", quota=0.5, conditions=basegame_condition),
                ],
            ),
            BetMode(
                name="bonus",
                cost=100.0,
                rtp=self.rtp,
                max_win=mode_maxwins["bonus"],
                auto_close_disabled=False,
                is_feature=False,
                is_buybonus=True,
                distributions=[
                    Distribution(
                        criteria="wincap",
                        quota=0.001,
                        win_criteria=mode_maxwins["bonus"],
                        conditions=wincap_condition,
                    ),
                    Distribution(criteria="freegame", quota=0.1, conditions=freegame_condition),
                ],
            ),
        ]
