<script lang="ts" module>
	export type EmitterEventWinLines =
		| { type: 'winLinesShow'; wins: WinLineData[] }
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

	// Neon colour palette — matches Wild Party theme
	const LINE_COLORS = [
		0xff2288, // hot pink
		0x00eeff, // cyan
		0xffee00, // yellow
		0xff6600, // orange
		0x00ff88, // green
		0xcc44ff, // purple
		0x44aaff, // blue
		0xffaa00, // gold
		0xff44aa, // magenta
		0x22ffcc, // teal
		0xff4444, // red
		0x88ff44, // lime
		0x4488ff, // sky
		0xff88ff, // pink
		0xaaff22, // chartreuse
		0xff6688, // coral
		0x66ffee, // aqua
		0xffcc44, // amber
		0xaa66ff, // violet
		0x44ff66, // mint
		0xff3366, // rose
		0x3399ff, // ocean
		0xffff66, // lemon
		0xff9944, // tangerine
		0x66ff99, // jade
		0xdd44ff, // orchid
		0x44ddff, // cerulean
		0xff6633, // vermillion
		0x99ff44, // spring
		0xff44dd, // fuchsia
		0x44ffbb, // turquoise
		0xffbb44, // honey
		0x7744ff, // indigo
		0x44ff44, // neon green
		0xff4477, // crimson
	];

	type DrawnLine = {
		lineIndex: number;
		color: number;
		points: { x: number; y: number }[];
	};

	let drawnLines = $state<DrawnLine[]>([]);
	let show = $state(false);

	// Get the center coordinate of a symbol cell
	function getSymbolCenter(reel: number, row: number) {
		const x = (reel + 0.5) * SYMBOL_SIZE;
		const y = (row + 0.5) * SYMBOL_SIZE;
		return { x, y };
	}

	context.eventEmitter.subscribeOnMount({
		winLinesShow: async ({ wins }) => {
			drawnLines = [];
			show = true;

			// Build all lines at once — using payline definitions for full 5-reel path
			const allLines: DrawnLine[] = [];

			for (const win of wins) {
				const lineIdx = win.lineIndex;
				const color = LINE_COLORS[(lineIdx - 1) % LINE_COLORS.length];

				// Get the full payline path from config (all 5 reels)
				const paylineKey = String(lineIdx);
				const paylineRows: number[] =
					(config.paylines as Record<string, number[]>)[paylineKey];

				if (!paylineRows) continue;

				// Build points for the full payline path across all 5 reels
				const points: { x: number; y: number }[] = [];
				for (let reel = 0; reel < paylineRows.length; reel++) {
					points.push(getSymbolCenter(reel, paylineRows[reel]));
				}

				allLines.push({ lineIndex: lineIdx, color, points });
			}

			// Show lines one by one with stagger for readability
			for (let i = 0; i < allLines.length; i++) {
				drawnLines = [...drawnLines, allLines[i]];
				if (i < allLines.length - 1) {
					await waitForTimeout(500);
				}
			}

			// Hold all lines visible
			await waitForTimeout(800);
		},
		winLinesHide: () => {
			show = false;
			drawnLines = [];
		},
		winLinesClear: () => {
			drawnLines = [];
		},
	});
</script>

{#if show && drawnLines.length > 0}
	<BoardContainer>
		<Container zIndex={10}>
			{#each drawnLines as line (line.lineIndex)}
				<Graphics
					draw={(g) => {
						if (!line.points || line.points.length < 2) return;
						g.clear();

						// Outer glow (thick, semi-transparent)
						g.lineStyle(8, line.color, 0.25);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) {
							g.lineTo(line.points[i].x, line.points[i].y);
						}

						// Mid glow
						g.lineStyle(5, line.color, 0.5);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) {
							g.lineTo(line.points[i].x, line.points[i].y);
						}

						// Core line (solid, bright)
						g.lineStyle(2.5, line.color, 0.9);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) {
							g.lineTo(line.points[i].x, line.points[i].y);
						}

						// Bright center highlight
						g.lineStyle(1, 0xffffff, 0.6);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) {
							g.lineTo(line.points[i].x, line.points[i].y);
						}
					}}
				/>
			{/each}
		</Container>
	</BoardContainer>
{/if}
