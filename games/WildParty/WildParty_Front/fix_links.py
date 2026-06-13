"""Repoint this app's node_modules symlinks at the live web-sdk workspace.

WildParty_Front was copied out of web-sdk/apps/WildParty into math-sdk, which
broke every pnpm workspace symlink (their relative targets assumed the old
location). We recompute each symlink's intended absolute target by mapping the
real path back to the original web-sdk location, then recreate it as an absolute
link so module resolution follows into web-sdk.
"""

import os

HERE = os.path.dirname(os.path.abspath(__file__))
NM = os.path.join(HERE, "node_modules")
ORIG_BASE = "/Users/stone/Stake_Engine/web-sdk/apps/WildParty"

fixed = 0
skipped = 0
for root, dirs, files in os.walk(NM, followlinks=False):
    entries = list(dirs) + list(files)
    for name in entries:
        p = os.path.join(root, name)
        if not os.path.islink(p):
            continue
        target = os.readlink(p)
        if os.path.isabs(target):
            continue
        # map real dir -> original web-sdk dir, resolve target there
        rel_dir = os.path.relpath(root, HERE)  # e.g. node_modules/@sveltejs
        orig_dir = os.path.join(ORIG_BASE, rel_dir)
        abs_target = os.path.normpath(os.path.join(orig_dir, target))
        if not os.path.exists(abs_target):
            skipped += 1
            continue
        os.remove(p)
        os.symlink(abs_target, p)
        fixed += 1
    # don't descend into symlinked dirs
    dirs[:] = [d for d in dirs if not os.path.islink(os.path.join(root, d))]

# Loader GIFs: +layout.svelte resolves ../../ from src/routes/ → project root.
for name in ("stake-engine-loader.gif", "loader.gif"):
    link = os.path.join(HERE, name)
    target = os.path.join(HERE, "static", name)
    if os.path.lexists(link):
        continue
    if os.path.isfile(target):
        os.symlink(os.path.join("static", name), link)
        print(f"linked {name} -> static/{name}")

print(f"fixed={fixed} skipped(missing target)={skipped}")
