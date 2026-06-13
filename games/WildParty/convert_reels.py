"""One-off helper: convert game120_info reel strips into Stake math-sdk reel CSVs.

Symbol id -> Stake symbol name mapping (from the WildParty paytable spec):
    1  -> W   (Wild / polar bear)
    2  -> S   (Scatter / igloo)
    10 -> H1  (orca)
    11 -> H2  (seal)
    12 -> H3  (wolf)
    13 -> H4  (owl)
    14 -> L1  (A)
    15 -> L2  (K)
    16 -> L3  (Q)
    17 -> L4  (J)
"""

import os

from importlib import import_module

# game120_info file has a date in the name, import it dynamically.
mod = import_module("game120_info_20250208_")
game120_info = mod.game120_info

ID_TO_NAME = {
    1: "W",
    2: "S",
    10: "H1",
    11: "H2",
    12: "H3",
    13: "H4",
    14: "L1",
    15: "L2",
    16: "L3",
    17: "L4",
}

REELS_DIR = os.path.join(os.path.dirname(__file__), "reels")


def reel_dict_to_columns(reel_dict):
    """reel_dict has keys '0'..'4'; return list of 5 columns (lists of names)."""
    cols = []
    for r in range(5):
        cols.append([ID_TO_NAME[int(s)] for s in reel_dict[str(r)]])
    return cols


def write_csv(path, columns):
    """columns: list of 5 lists. Each CSV row = one strip position across the 5 reels."""
    length = max(len(c) for c in columns)
    # pad shorter reels by cycling (all base/free strips here are equal length though)
    padded = []
    for c in columns:
        if len(c) < length:
            c = (c * ((length // len(c)) + 1))[:length]
        padded.append(c)
    with open(path, "w", encoding="UTF-8") as f:
        for i in range(length):
            f.write(",".join(padded[r][i] for r in range(5)) + "\n")


def main():
    default = game120_info["A"]

    # Base game reels from spin_reels[0]
    base_cols = reel_dict_to_columns(default["spin_reels"][0])
    write_csv(os.path.join(REELS_DIR, "BR0.csv"), base_cols)
    print("BR0.csv written", len(base_cols[0]), "rows")

    nature = default["main_game"]["nature_table"]

    # Free game reel: set 0 is the only full-length strip with scatters present
    # on reels 3,4,5 (enables the 3-scatter retrigger) plus wilds on reels 2-5.
    free_cols = reel_dict_to_columns(nature[0])
    write_csv(os.path.join(REELS_DIR, "FR0.csv"), free_cols)
    print("FR0.csv written", len(free_cols[0]), "rows")

    # Wincap-forcing free reel: wild-saturated strip (set 1) drives the large
    # accumulating multipliers needed to reach the win cap.
    wcap_cols = reel_dict_to_columns(nature[1])
    write_csv(os.path.join(REELS_DIR, "FRWCAP.csv"), wcap_cols)
    print("FRWCAP.csv written", len(wcap_cols[0]), "rows")


if __name__ == "__main__":
    main()
