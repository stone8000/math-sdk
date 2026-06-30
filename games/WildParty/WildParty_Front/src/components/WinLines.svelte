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

	let drawnLines = $state<DrawnLine[]>([]);
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

	context.eventEmitter.subscribeOnMount({
		winLinesShow: async ({ wins, fast }) => {
			drawnLines = [];
			show = true;

			const allLines: DrawnLine[] = [];

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
			}

			if (fast) {
				for (let i = 0; i < allLines.length; i++) {
					drawnLines = [allLines[i]];
					await waitForTimeout(180);
				}
			} else {
				for (let i = 0; i < allLines.length; i++) {
					drawnLines = [allLines[i]];
					await waitForTimeout(420);
				}
			}
			await waitForTimeout(250);
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
						g.lineStyle(7, line.color, 0.22);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
						g.lineStyle(3, line.color, 0.95);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
						g.lineStyle(1.2, 0xffffff, 0.5);
						g.moveTo(line.points[0].x, line.points[0].y);
						for (let i = 1; i < line.points.length; i++) g.lineTo(line.points[i].x, line.points[i].y);
					}}
				/>
			{/each}
		</Container>
	</BoardContainer>
{/if}
