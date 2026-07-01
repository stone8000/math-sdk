<script lang="ts">
	import { Container, Graphics, Text, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { MainContainer } from 'components-layout';
	import { onMount } from 'svelte';

	import { getContext } from '../game/context';
	import TransitionAnimation from './TransitionAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';

	type Props = {
		onloaded: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let loadingType = $state<'start' | 'transition'>('start');
	let pulseTick = $state(0);

	// Animate progress bar smoothly
	let animatedProgress = $state(0);
	$effect(() => {
		const target = context.stateApp.loaded ? 100 : 80;
		const interval = setInterval(() => {
			if (animatedProgress < target) {
				animatedProgress = Math.min(animatedProgress + 2, target);
			} else {
				clearInterval(interval);
			}
		}, 25);
		return () => clearInterval(interval);
	});

	onMount(() => {
		const id = setInterval(() => {
			pulseTick += 1;
		}, 32);
		return () => clearInterval(id);
	});
</script>

<!-- Wild Party branded loading screen -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<!-- Background image (party theme) -->
		<Sprite
			key="wildPartyBgBase"
			anchor={0.5}
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.5}
			width={context.stateLayoutDerived.mainLayout().width}
			height={context.stateLayoutDerived.mainLayout().height}
		/>

		<!-- Dark overlay for readability -->
		<Graphics
			draw={(g) => {
				const w = context.stateLayoutDerived.mainLayout().width;
				const h = context.stateLayoutDerived.mainLayout().height;
				g.clear();
				g.beginFill(0x050010, 0.68);
				g.drawRect(0, 0, w, h);
				g.endFill();

				// subtle vignette / top glow so the screen looks less flat
				g.beginFill(0xff95dc, 0.04);
				g.drawEllipse(w * 0.5, h * 0.28, w * 0.22, h * 0.11);
				g.endFill();

				g.beginFill(0x000000, 0.22);
				g.drawRect(0, h * 0.72, w, h * 0.28);
				g.endFill();
			}}
		/>

		<Graphics
			draw={(g) => {
				const w = context.stateLayoutDerived.mainLayout().width;
				const h = context.stateLayoutDerived.mainLayout().height;
				const glowX = w * 0.5 + Math.sin(pulseTick / 48) * w * 0.08;
				const glowAlpha = 0.03 + 0.015 * (0.5 + 0.5 * Math.sin(pulseTick / 22));
				g.clear();
				g.beginFill(0xffd67c, glowAlpha);
				g.drawEllipse(glowX, h * 0.34, w * 0.26, h * 0.1);
				g.endFill();
			}}
		/>

		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.36}
		>
			<!-- Game title -->
			<Text
				anchor={0.5}
				text="WILD PARTY"
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 56,
					fontWeight: '900',
					fill: 0xfff4cf,
					letterSpacing: 8,
					dropShadow: true,
					dropShadowColor: 0xff9edf,
					dropShadowBlur: 18,
					dropShadowDistance: 0,
					stroke: 0xffffff,
					strokeThickness: 1,
				}}
			/>

			<!-- Subtitle -->
			<Text
				anchor={0.5}
				y={65}
				text="3X5, 35 LINES MAX WIN 5,000X"
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 14,
					fontWeight: '600',
					fill: 0xd9d8e8,
					letterSpacing: 3,
				}}
			/>
		</Container>

		<!-- Progress bar area -->
		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.6}
		>
			<!-- Progress bar -->
			<Graphics
				draw={(g) => {
					const barWidth = 240;
					const barHeight = 4;
					g.clear();
					// Background track
					g.beginFill(0x2a2338, 0.82);
					g.drawRoundedRect(-barWidth / 2, -barHeight / 2, barWidth, barHeight, 2);
					g.endFill();
					// Progress fill
					const fillWidth = (barWidth * animatedProgress) / 100;
					if (fillWidth > 0) {
						g.beginFill(0xff8ede, 0.94);
						g.drawRoundedRect(-barWidth / 2, -barHeight / 2, fillWidth, barHeight, 2);
						g.endFill();
					}
				}}
			/>

			<!-- Loading text -->
			<Text
				anchor={0.5}
				y={20}
				text={context.stateApp.loaded
					? 'TAP TO CONTINUE'
					: `LOADING ${Math.round(animatedProgress)}%`}
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 12,
					fontWeight: '500',
					fill: 0xb6a8c9,
					letterSpacing: 2,
				}}
			/>
		</Container>
	</MainContainer>
</FadeContainer>

<!-- press to continue -->
<FadeContainer show={loadingType === 'start' && context.stateApp.loaded}>
	<PressToContinue onpress={() => (loadingType = 'transition')} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'}>
	<TransitionAnimation oncomplete={props.onloaded} />
</FadeContainer>
