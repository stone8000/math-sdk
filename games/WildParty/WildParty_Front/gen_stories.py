"""Build Storybook demo data (src/stories/data/*) from the real WildParty math output.

- base_events.ts / bonus_events.ts <- library/configs/event_config_*.json
- base_books.ts / bonus_books.ts   <- a curated subset of the generated books
  (zero win, base-game wins, free-game, retrigger, wincap) so the demo plays
  actual WildParty rounds instead of the old sample-game fixtures.
"""

import json
import os
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.normpath(os.path.join(HERE, "..", "library"))
CFG = os.path.join(LIB, "configs")
PUB = os.path.join(LIB, "publish_files")
DATA = os.path.join(HERE, "src", "stories", "data")


def write_events(mode):
    src = os.path.join(CFG, f"event_config_{mode}.json")
    with open(src, "r", encoding="utf-8") as f:
        d = json.load(f)
    out = os.path.join(DATA, f"{mode}_events.ts")
    with open(out, "w", encoding="utf-8") as f:
        f.write("export default " + json.dumps(d, indent="\t", ensure_ascii=False) + ";\n")
    print("wrote", out)


def event_types(book):
    return {e["type"] for e in book["events"]}


def pick_books(mode, targets):
    """Stream the .zst book file and collect a curated subset.

    targets: dict bucket -> count. Buckets:
      zero, win, freegame, retrigger, wincap
    """
    src = os.path.join(PUB, f"books_{mode}.jsonl.zst")
    buckets = {k: [] for k in targets}
    proc = subprocess.Popen(["zstdcat", src], stdout=subprocess.PIPE, text=True)
    scanned = 0
    try:
        for line in proc.stdout:
            scanned += 1
            if scanned > 1_500_000:
                break
            line = line.strip()
            if not line:
                continue
            b = json.loads(line)
            crit = str(b.get("criteria"))
            ets = event_types(b)
            placed = False
            if "wincap" in ets and len(buckets["wincap"]) < targets["wincap"]:
                buckets["wincap"].append(b); placed = True
            elif "freeSpinRetrigger" in ets and len(buckets["retrigger"]) < targets["retrigger"]:
                buckets["retrigger"].append(b); placed = True
            elif crit == "freegame" and len(buckets["freegame"]) < targets["freegame"]:
                buckets["freegame"].append(b); placed = True
            elif crit == "0" and len(buckets["zero"]) < targets["zero"]:
                buckets["zero"].append(b); placed = True
            elif b.get("payoutMultiplier", 0) > 0 and len(buckets["win"]) < targets["win"]:
                buckets["win"].append(b); placed = True
            if all(len(buckets[k]) >= targets[k] for k in targets):
                break
    finally:
        proc.terminate()

    selected = []
    for k in ["zero", "win", "freegame", "retrigger", "wincap"]:
        selected.extend(buckets.get(k, []))
    # renumber ids sequentially for a clean demo list
    for i, b in enumerate(selected, start=1):
        b["id"] = i
    print(f"{mode}: scanned={scanned} picked=" + ", ".join(f"{k}={len(buckets[k])}" for k in targets))
    out = os.path.join(DATA, f"{mode}_books.ts")
    with open(out, "w", encoding="utf-8") as f:
        f.write("export default " + json.dumps(selected, indent="\t", ensure_ascii=False) + ";\n")
    print("wrote", out, f"({len(selected)} books)")


def main():
    write_events("base")
    write_events("bonus")
    pick_books("base", {"zero": 2, "win": 8, "freegame": 8, "retrigger": 2, "wincap": 1})
    pick_books("bonus", {"zero": 0, "win": 2, "freegame": 10, "retrigger": 2, "wincap": 1})


if __name__ == "__main__":
    main()
