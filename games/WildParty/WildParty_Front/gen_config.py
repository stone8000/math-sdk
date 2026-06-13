"""Generate src/game/config.ts from the math-sdk frontend config.

Source of truth: math-sdk/games/WildParty/library/configs/config_fe_WildParty.json
(produced by `generate_configs` when running run.py). This keeps the frontend
contract (symbols, paytable, 35 paylines, padding reels, bet modes) in exact sync
with the math books so the player stays stateless.
"""

import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.normpath(
    os.path.join(HERE, "..", "library", "configs", "config_fe_WildParty.json")
)
DST = os.path.join(HERE, "src", "game", "config.ts")


def main():
    with open(SRC, "r", encoding="utf-8") as f:
        d = json.load(f)

    # branding to match this game (math config defaults to the sample names)
    d["gameName"] = "wild_party"

    # symbols arrive as a list of single-key dicts -> flatten to one object
    symbols = {}
    for entry in d["symbols"]:
        for name, info in entry.items():
            symbols[name] = info
    d["symbols"] = symbols

    body = json.dumps(d, indent="\t", ensure_ascii=False)
    # JSON uses 4-tab? json indent="\t" already uses tabs. Keys are quoted strings,
    # which is valid TS object syntax.
    ts = "export default " + body + ";\n"

    with open(DST, "w", encoding="utf-8") as f:
        f.write(ts)
    print("wrote", DST)
    print("symbols:", list(symbols.keys()))
    print("paylines:", len(d["paylines"]))


if __name__ == "__main__":
    main()
