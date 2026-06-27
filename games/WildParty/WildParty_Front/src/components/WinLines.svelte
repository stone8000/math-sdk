<script lang="ts" module>
	export type EmitterEventWinLines =
		| { type: 'winLinesShow'; wins: WinLineData[]; fast?: boolean }
		| { type: 'winLinesHide' }
		| { type: 'winLinesClear' };

	export type WinLineData = {
		lineIndex: number;
		positions: { reel: number; row: number }[];
		symbolCount: number;
	};
</script>

<script lang="ts">
	import { Graphics, Container } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';

	import BoardContainer from './BoardContainer.svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, REEL_PADDING } from '../game/constants';
	import config from '../game/config';

	const context = getContext();

	// Visible row indices in padded array: 1=top, 2=mid, 3=bottom
	const VISIBLE_ROW_MIN = 1;
	const VISIBLE_ROW_MAX = 3;

	const LINE_COLORS = [
		0xff2288, 0x00eeff, 0xffee00, 0xff6600, 0x00ff88,
		0xcc44ff, 0x44aaff, 0xffaa00, 0xff44aa, 0x22ffcc,
		0xff4444, 0x88ff44, 0x4488ff, 0xff88ff, 0xaaff22,
		0xff6688, 0x66ffee, 0xffcc44, 0xaa66ff, 0x44ff66,
		0xff3366, 0x3399ff, 0xffff66, 0xff9944, 0x66ff99,
		0xdd44ff, 0x44ddff, 0xff6633, 0x99ff44, 0xff44dd,
		0x44ffbb, 0xffbb44, 0x7744ff, 0x44ff44, 0xff4477,
	];

	type DrawnLine = {
		lineIndex: number;
		color: number;
		points: { x: number; y: number }[];
	};

	type HighlightBox = {
		x: number;
		y: number;
		color: number;
	};

	let drawnLines = $state<DrawnLine[]>([]);
	let highlightBoxes = $state<HighlightBox[]>([]);
	let show = $state(false);

	// Symbol center X: same formula as getSymbolX in utils.ts
	function symbolCenterX(reel: number) {
		return SYMBOL_SIZE * (reel + REEL_PADDING);
	}

	// Symbol center Y accounts for the reel default offset (-SYMBOL_SIZE)
	// Actual render: reelY(-120) + (arrayIndex + 0.5) * 120
	// Payline rows (0,1,2) map to padded array indices (1,2,3)
	function symbolCenterYFromPayline(paylineRow: number) {
		return -SYMBOL_SIZE + (paylineRow + 1 + 0.5) * SYMBOL_SIZE;
	}

	// From padded row index (1,2,3 = visible rows)
	function symbolCenterYFromRow(row: number) {
		return -SYMBOL_SIZE + (row + 0.5) * SYMBOL_SIZE;
	}

	context.eventEmitter.subscribeOnMount({
		winLinesShow: async ({ wins, fast }) => {
			drawnLines = [];
			highlightBoxes = [];
			show = true;

			const allLines: DrawnLine[] = [];
			const allBoxes: HighlightBox[] = [];

			for (const win of wins) {
				const lineIdx = win.lineIndex;
				const color = LINE_COLORS[(lineIdx - 1) % LINE_COLORS.length];

				// Full payline path
				const paylineRows: number[] =
					(config.paylines as Record<string, number[]>)[String(lineIdx)];
				if (!paylineRows) continue;

				const points: { x: number; y: number }[] = [];
				for (let reel = 0; reel < paylineRows.length; reel++) {
					points.push({
						x: symbolCenterX(reel),
						y: symbolCenterYFromPayline(paylineRows[reel]),
					});
				}
				allLines.push({ lineIndex: lineIdx, color, points });

				// Highlight boxes centered on winning symbol positions
				for (const pos of win.positions) {
					if (pos.row >= VISIBLE_ROW_MIN && pos.row <= VISIBLE_ROW_MAX) {
						// Box top-left = symbol center - half symbol size
						allBoxes.push({
							x: symbolCenterX(pos.reel) - SYMBOL_SIZE / 2,
							y: symbolCenterYFromRow(pos.row) - SYMBOL_SIZE / 2,
							color,
						});
					}
				}
			}

			if (fast) {
				drawnLines = allLines;
				highlightBoxes = allBoxes;
				await waitForTimeout(350);
			} else {
				for (let i = 0; i < allLines.length; i++) {
					drawnLines = [...drawnLines, allLines[i]];
					const win = wins[i];
					for (const pos of win.positions) {
						if (pos.row >= VISIBLE_ROW_MIN && pos.row <= VISIBLE_ROW_MAX) {
							const color = LINE_COLORS[(win.lineIndex - 1) % LINE_COLORS.length];
							highlightBoxes = [
								...highlightBoxes,
								{
									x: symbolCenterX(pos.reel) - SYMBOL_SIZE / 2,
									y: symbolCenterYFromRow(pos.row) - SYMBOL_SIZE / 2,
									color,
								},
							];
						}
					}
					if (i < allLines.length - 1) {
						await waitForTimeout(400);
					}
				}
				await waitForTimeout(500);
			}
		},
		winLinesHide: () => {
			show = false;
			drawnLines = [];
			highlightBoxes = [];
		},
		winLinesClear: () => {
			drawnLines = [];
			highlightBoxes = [];
		},
	});
</script>

{#if show && (drawnLines.length > 0 || highlightBoxes.length > 0)}
	<BoardContainer>
		<Container zIndex={10}>
			{#each drawnLines as line (line.lineIndex)}
				<Graphics
					draw={(g) => {
						if (!line.points || line.points.length < 2) return;
						g.clear();
						g.lineStyle(6, line.color, 0.2);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
						g.lineStyle(2.5, line.color, 0.8);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
						g.lineStyle(0.8, 0xffffff, 0.4);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
					}}
				/>
			{/each}

			{#each highlightBoxes as box, i (i)}
				<Graphics
					draw={(g) => {
						const pad = 4;
						const size = SYMBOL_SIZE - pad * 2;
						const cx = box.x + SYMBOL_SIZE / 2;
						const cy = box.y + SYMBOL_SIZE / 2;
						g.clear();

						// Outer soft glow
						g.lineStyle(5, box.color, 0.15);
						g.drawRoundedRect(box.x + pad - 2, box.y + pad - 2, size + 4, size + 4, 12);

						// Main neon border
						g.lineStyle(2.5, box.color, 0.85);
						g.drawRoundedRect(box.x + pad, box.y + pad, size, size, 10);

						// Inner bright edge
						g.lineStyle(1, 0xffffff, 0.3);
						g.drawRoundedRect(box.x + pad + 2, box.y + pad + 2, size - 4, size - 4, 8);

						// Subtle fill with radial-like fade (center brighter)
						g.beginFill(box.color, 0.05);
						g.drawRoundedRect(box.x + pad, box.y + pad, size, size, 10);
						g.endFill();

						// Corner sparkle dots (party vibe)
						g.beginFill(0xffffff, 0.6);
						g.drawCircle(box.x + pad + 4, box.y + pad + 4, 1.5);
						g.drawCircle(box.x + pad + size - 4, box.y + pad + 4, 1.5);
						g.drawCircle(box.x + pad + 4, box.y + pad + size - 4, 1.5);
						g.drawCircle(box.x + pad + size - 4, box.y + pad + size - 4, 1.5);
						g.endFill();
					}}
				/>
			{/each}
		</Container>
	</BoardContainer>
{/if}
