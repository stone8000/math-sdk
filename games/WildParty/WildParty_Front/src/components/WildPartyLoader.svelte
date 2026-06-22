<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		// minimum time the loader stays on screen before fading out
		duration?: number;
		oncomplete?: () => void;
	};

	const props: Props = $props();

	let show = $state(true);

	onMount(() => {
		const id = setTimeout(() => {
			show = false;
			props.oncomplete?.();
		}, props.duration ?? 1600);
		return () => clearTimeout(id);
	});
</script>

{#if show}
	<div class="wp-loader" transition:fade={{ duration: 400 }}>
		<div class="wp-loader-inner">
			<div class="wp-title">WILD PARTY</div>
			<div class="wp-spinner"></div>
			<div class="wp-text">LOADING…</div>
		</div>
	</div>
{/if}

<style>
	.wp-loader {
		position: absolute;
		inset: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at 50% 40%, #1a0533 0%, #07010f 70%);
	}

	.wp-loader-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.4rem;
		font-family: 'proxima-nova', Arial, sans-serif;
	}

	.wp-title {
		font-size: 2.2rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		background: linear-gradient(135deg, #ffd34d 0%, #ff7ad9 50%, #a855f7 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		filter: drop-shadow(0 0 18px rgba(255, 122, 217, 0.5));
	}

	.wp-spinner {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 4px solid rgba(255, 255, 255, 0.12);
		border-top-color: #ff7ad9;
		border-right-color: #ffd34d;
		animation: wp-spin 0.8s linear infinite;
	}

	.wp-text {
		font-size: 0.8rem;
		letter-spacing: 0.3em;
		color: rgba(255, 255, 255, 0.55);
	}

	@keyframes wp-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
