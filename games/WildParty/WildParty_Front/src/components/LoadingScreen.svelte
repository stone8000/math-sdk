<script lang="ts">
	import { Container, Graphics, Text, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import TransitionAnimation from './TransitionAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';

	type Props = {
		onloaded: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let loadingType = $state<'start' | 'transition'>('start');

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
				g.beginFill(0x050010, 0.75);
				g.drawRect(0, 0, w, h);
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
					fill: 0xffffff,
					letterSpacing: 8,
					dropShadow: true,
					dropShadowColor: 0xcc00ff,
					dropShadowBlur: 16,
					dropShadowDistance: 0,
				}}
			/>

			<!-- Subtitle -->
			<Text
				anchor={0.5}
				y={65}
				text="5×3 · 35 LINES · MAX WIN 5,000×"
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 14,
					fontWeight: '500',
					fill: 0xccccdd,
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
					g.beginFill(0x222233, 0.6);
					g.drawRoundedRect(-barWidth / 2, -barHeight / 2, barWidth, barHeight, 2);
					g.endFill();
					// Progress fill
					const fillWidth = (barWidth * animatedProgress) / 100;
					if (fillWidth > 0) {
						g.beginFill(0xcc44ff, 0.9);
						g.drawRoundedRect(-barWidth / 2, -barHeight / 2, fillWidth, barHeight, 2);
						g.endFill();
					}
				}}
			/>

			<!-- Loading text -->
			<Text
				anchor={0.5}
				y={20}
				text={context.stateApp.loaded ? 'TAP TO CONTINUE' : `${Math.round(animatedProgress)}%`}
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 12,
					fontWeight: '400',
					fill: 0x9988aa,
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
