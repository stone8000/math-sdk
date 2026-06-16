<script lang="ts" module>
	export type EmitterEventWinLines =
		| { type: 'winLinesShow'; wins: WinLineData[] }
		| { type: 'winLinesHide' }
		| { type: 'winLinesClear' };

	export type WinLineData = {
		lineIndex: number;
		positions: { reel: number; row: number }[];
	};
</script>

<script lang="ts">
	import { Graphics, Container } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';

	import BoardContainer from './BoardContainer.svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, REEL_PADDING } from '../game/constants';

	const context = getContext();

	// Line colours — rotate through a neon palette for visual variety
	const LINE_COLORS = [
		0xff00ff, // magenta
		0x00ffff, // cyan
		0xffff00, // yellow
		0xff6600, // orange
		0x00ff66, // mint green
		0xff3399, // hot pink
		0x66ccff, // sky blue
		0xffcc00, // gold
		0xcc66ff, // purple
		0x33ff99, // spring green
	];

	type DrawnLine = {
		lineIndex: number;
		positions: { reel: number; row: number }[];
		color: number;
		alpha: number;
	};

	let drawnLines = $state<DrawnLine[]>([]);
	let show = $state(false);

	// Calculate pixel position for a symbol at (reel, row)
	function getSymbolCenter(reel: number, row: number) {
		const x = SYMBOL_SIZE * (reel + REEL_PADDING);
		const y = (row + 0.5) * SYMBOL_SIZE;
		return { x, y };
	}

	context.eventEmitter.subscribeOnMount({
		winLinesShow: async ({ wins }) => {
			drawnLines = [];
			show = true;

			// Draw lines one by one with a stagger delay (600ms per line — not too fast)
			for (let i = 0; i < wins.length; i++) {
				const win = wins[i];
				const color = LINE_COLORS[win.lineIndex % LINE_COLORS.length];
				drawnLines = [
					...drawnLines,
					{
						lineIndex: win.lineIndex,
						positions: win.positions,
						color,
						alpha: 0.85,
					},
				];
				// Wait between each line draw for a relaxed rhythm
				if (i < wins.length - 1) {
					await waitForTimeout(600);
				}
			}
			// Hold all lines visible briefly before handler continues
			await waitForTimeout(400);
		},
		winLinesHide: () => {
			show = false;
			drawnLines = [];
		},
		winLinesClear: () => {
			drawnLines = [];
		},
	});

	function drawLine(
		g: any,
		positions: { reel: number; row: number }[],
		color: number,
		alpha: number,
	) {
		if (!positions || positions.length < 2) return;

		g.clear();
		// Glow layer (thicker, more transparent)
		g.lineStyle(6, color, alpha * 0.4);
		const first = getSymbolCenter(positions[0].reel, positions[0].row);
		g.moveTo(first.x, first.y);
		for (let i = 1; i < positions.length; i++) {
			const p = getSymbolCenter(positions[i].reel, positions[i].row);
			g.lineTo(p.x, p.y);
		}

		// Core line (thinner, solid)
		g.lineStyle(3, color, alpha);
		g.moveTo(first.x, first.y);
		for (let i = 1; i < positions.length; i++) {
			const p = getSymbolCenter(positions[i].reel, positions[i].row);
			g.lineTo(p.x, p.y);
		}

		// Draw small circles at each symbol position
		for (const pos of positions) {
			const p = getSymbolCenter(pos.reel, pos.row);
			g.beginFill(color, alpha);
			g.drawCircle(p.x, p.y, 5);
			g.endFill();
		}
	}
</script>

{#if show && drawnLines.length > 0}
	<BoardContainer>
		<Container zIndex={10}>
			{#each drawnLines as line (line.lineIndex)}
				<Graphics draw={(g) => drawLine(g, line.positions, line.color, line.alpha)} />
			{/each}
		</Container>
	</BoardContainer>
{/if}
