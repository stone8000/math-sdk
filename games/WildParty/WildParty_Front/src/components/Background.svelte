<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freegame');
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x120016} zIndex={-3} />

<!-- Wild Party base-game background (placeholder art) -->
<FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<Sprite key="wildPartyBgBase" {...context.stateLayoutDerived.canvasSizes()} />
</FadeContainer>

<!-- Wild Party free-game background (placeholder art) -->
<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-1}>
	<Sprite key="wildPartyBgFeature" {...context.stateLayoutDerived.canvasSizes()} />
</FadeContainer>
