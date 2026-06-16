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
	let progress = $state(0);

	// Simulate loading progress based on actual asset loading state
	$effect(() => {
		if (context.stateApp.loaded) {
			progress = 100;
		}
	});

	// Animate progress bar smoothly
	let animatedProgress = $state(0);
	$effect(() => {
		const target = context.stateApp.loaded ? 100 : 75;
		const interval = setInterval(() => {
			if (animatedProgress < target) {
				animatedProgress = Math.min(animatedProgress + 1.5, target);
			} else {
				clearInterval(interval);
			}
		}, 30);
		return () => clearInterval(interval);
	});
</script>

<!-- Wild Party branded loading screen -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<!-- Dark gradient background overlay -->
		<Graphics
			draw={(g) => {
				const w = context.stateLayoutDerived.mainLayout().width;
				const h = context.stateLayoutDerived.mainLayout().height;
				g.clear();
				g.beginFill(0x0a0014, 0.95);
				g.drawRect(0, 0, w, h);
				g.endFill();
			}}
		/>

		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.38}
		>
			<!-- Game title -->
			<Text
				anchor={0.5}
				text="WILD PARTY"
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 64,
					fontWeight: '900',
					fill: 0xffffff,
					letterSpacing: 6,
					dropShadow: true,
					dropShadowColor: 0xff00ff,
					dropShadowBlur: 12,
					dropShadowDistance: 0,
				}}
			/>

			<!-- Subtitle -->
			<Text
				anchor={0.5}
				y={70}
				text="✦ PREMIUM SLOT EXPERIENCE ✦"
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 16,
					fontWeight: '400',
					fill: 0xaaaacc,
					letterSpacing: 4,
				}}
			/>
		</Container>

		<!-- Progress bar area -->
		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.62}
		>
			<!-- Progress bar background -->
			<Graphics
				draw={(g) => {
					const barWidth = 280;
					const barHeight = 6;
					g.clear();
					// Background track
					g.beginFill(0x222233, 0.8);
					g.drawRoundedRect(-barWidth / 2, -barHeight / 2, barWidth, barHeight, 3);
					g.endFill();
					// Progress fill with gradient effect
					const fillWidth = (barWidth * animatedProgress) / 100;
					if (fillWidth > 0) {
						g.beginFill(0xff00ff, 1);
						g.drawRoundedRect(-barWidth / 2, -barHeight / 2, fillWidth, barHeight, 3);
						g.endFill();
						// Glow highlight
						g.beginFill(0xff66ff, 0.6);
						g.drawRoundedRect(-barWidth / 2, -barHeight / 2, fillWidth, barHeight * 0.4, 3);
						g.endFill();
					}
				}}
			/>

			<!-- Loading text -->
			<Text
				anchor={0.5}
				y={24}
				text={context.stateApp.loaded ? 'READY' : 'LOADING...'}
				style={{
					fontFamily: 'proxima-nova, Arial, sans-serif',
					fontSize: 13,
					fontWeight: '500',
					fill: 0x888899,
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
