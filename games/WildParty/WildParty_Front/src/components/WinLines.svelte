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
	import { SYMBOL_SIZE } from '../game/constants';
	import config from '../game/config';

	const context = getContext();

	// Neon colour palette
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

	function getSymbolCenter(reel: number, row: number) {
		return { x: (reel + 0.5) * SYMBOL_SIZE, y: (row + 0.5) * SYMBOL_SIZE };
	}

	context.eventEmitter.subscribeOnMount({
		winLinesShow: async ({ wins, fast }) => {
			drawnLines = [];
			highlightBoxes = [];
			show = true;

			// Build all line data
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
					points.push(getSymbolCenter(reel, paylineRows[reel]));
				}
				allLines.push({ lineIndex: lineIdx, color, points });

				// Highlight boxes on winning positions
				for (const pos of win.positions) {
					allBoxes.push({
						x: pos.reel * SYMBOL_SIZE,
						y: pos.row * SYMBOL_SIZE,
						color,
					});
				}
			}

			if (fast) {
				// Free game mode: show all lines + boxes at once, brief hold
				drawnLines = allLines;
				highlightBoxes = allBoxes;
				await waitForTimeout(400);
			} else {
				// Base game: stagger lines one by one
				for (let i = 0; i < allLines.length; i++) {
					drawnLines = [...drawnLines, allLines[i]];
					// Add boxes for this line's win
					const win = wins[i];
					for (const pos of win.positions) {
						const color = LINE_COLORS[(win.lineIndex - 1) % LINE_COLORS.length];
						highlightBoxes = [...highlightBoxes, { x: pos.reel * SYMBOL_SIZE, y: pos.row * SYMBOL_SIZE, color }];
					}
					if (i < allLines.length - 1) {
						await waitForTimeout(400);
					}
				}
				await waitForTimeout(600);
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
			<!-- Payline paths -->
			{#each drawnLines as line (line.lineIndex)}
				<Graphics
					draw={(g) => {
						if (!line.points || line.points.length < 2) return;
						g.clear();
						// Outer glow
						g.lineStyle(7, line.color, 0.2);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
						// Core line
						g.lineStyle(2.5, line.color, 0.85);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
						// White highlight
						g.lineStyle(1, 0xffffff, 0.5);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
					}}
				/>
			{/each}

			<!-- Symbol highlight boxes (glow frame around winning symbols) -->
			{#each highlightBoxes as box, i (i)}
				<Graphics
					draw={(g) => {
						const pad = 4;
						const size = SYMBOL_SIZE - pad * 2;
						g.clear();
						// Glow border
						g.lineStyle(3, box.color, 0.6);
						g.drawRoundedRect(box.x + pad, box.y + pad, size, size, 6);
						// Inner subtle fill
						g.beginFill(box.color, 0.08);
						g.drawRoundedRect(box.x + pad, box.y + pad, size, size, 6);
						g.endFill();
					}}
				/>
			{/each}
		</Container>
	</BoardContainer>
{/if}
