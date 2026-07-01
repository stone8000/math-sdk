<script lang="ts">
	import { Graphics, Rectangle, Sprite } from 'pixi-svelte';
	import type { Graphics as PixiGraphics } from 'pixi.js';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';
	import { onMount } from 'svelte';

	import { getContext } from '../game/context';

	const context = getContext();
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freegame');

	let rotation = $state(0);
	let beamPhase = $state(0);

	const drawSoftBeams = (g: PixiGraphics, phaseShift = 0) => {
		const { width, height } = context.stateLayoutDerived.canvasSizes();
		const beamReachY = Math.min(height * 0.42, 340);
		const centerX = width * 0.5 + Math.sin(beamPhase + phaseShift) * width * 0.15;

		g.clear();

		// Keep beams very subtle and in the upper area so they don't distract from reels.
		g.beginFill(0xfff0b8, 0.04);
		g.drawPolygon([
			centerX - width * 0.018,
			0,
			centerX + width * 0.018,
			0,
			centerX + width * 0.22,
			beamReachY,
			centerX - width * 0.22,
			beamReachY,
		]);
		g.endFill();

		g.beginFill(0xff8bd8, 0.03);
		g.drawPolygon([
			centerX + width * 0.11,
			0,
			centerX + width * 0.135,
			0,
			centerX + width * 0.32,
			beamReachY * 0.9,
			centerX + width * 0.26,
			beamReachY * 0.9,
		]);
		g.endFill();
	};

	onMount(() => {
		const id = setInterval(() => {
			rotation += 0.012;
			beamPhase += 0.004;
		}, 16);
		return () => clearInterval(id);
	});
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x120016} zIndex={-3} />

<!-- Wild Party base-game background (placeholder art) -->
<FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<Sprite key="wildPartyBgBase" {...context.stateLayoutDerived.canvasSizes()} />
	<Graphics draw={(g) => drawSoftBeams(g, 0)} />
	<Sprite
		key="wpH1"
		anchor={0.5}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={110}
		width={150}
		height={150}
		alpha={0.8}
		rotation={rotation}
	/>
</FadeContainer>

<!-- Wild Party free-game background (placeholder art) -->
<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-1}>
	<Sprite key="wildPartyBgFeature" {...context.stateLayoutDerived.canvasSizes()} />
	<Graphics draw={(g) => drawSoftBeams(g, 1.2)} />
	<Sprite
		key="wpH1"
		anchor={0.5}
		x={120}
		y={110}
		width={130}
		height={130}
		alpha={0.82}
		rotation={rotation}
	/>
</FadeContainer>
