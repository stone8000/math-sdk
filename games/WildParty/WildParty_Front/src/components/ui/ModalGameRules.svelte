<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import config from '../../game/config';

	const rtpPct = `${(config.rtp * 100).toFixed(2)}%`;
	const lineCount = Object.keys(config.paylines).length;
	const maxWin = config.betModes?.base?.max_win ?? 5000;
	const buyCost = config.betModes?.bonus?.cost;
</script>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<div class="wp-rules">
			<h2>WILD PARTY — GAME RULES</h2>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>How to play</h3>
				<p>
					Wild Party is a {config.numReels}&times;3 video slot with {lineCount} fixed paylines.
					Line wins pay left to right from the leftmost reel on adjacent reels. Only the
					highest win per line is paid. Theoretical RTP is {rtpPct}.
				</p>
			</section>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Wild</h3>
				<p>The Wild symbol substitutes for all symbols except the Scatter to help complete winning lines.</p>
			</section>

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Scatter &amp; Free Spins</h3>
				<p>
					Landing 3 or more Scatter symbols anywhere awards the Free Spins feature. During Free
					Spins a Global Multiplier grows as the feature progresses and is applied to your wins.
					Additional Scatters during the feature retrigger more Free Spins.
				</p>
			</section>

			{#if buyCost}
				<section class="wp-card">
					<h3><span class="wp-accent-bar"></span>Buy Bonus</h3>
					<p>You can buy direct entry into the Free Spins feature for {buyCost}&times; your total bet.</p>
				</section>
			{/if}

			<section class="wp-card">
				<h3><span class="wp-accent-bar"></span>Max Win</h3>
				<p>The maximum payout is capped at {maxWin.toLocaleString()}&times; the total bet. Once reached, the round ends and the win is awarded.</p>
			</section>

			<div class="wp-divider"></div>
			<p class="wp-foot">Malfunction voids all pays and plays. Game outcome is determined at spin time by the remote game server.</p>
		</div>
	</Popup>
{/if}

<style lang="scss">
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes cardFadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes shimmer {
		0% { background-position: -200% center; }
		100% { background-position: 200% center; }
	}

	@keyframes accentPulse {
		0%, 100% { opacity: 0.7; box-shadow: 0 0 6px rgba(255, 122, 217, 0.3); }
		50% { opacity: 1; box-shadow: 0 0 12px rgba(255, 122, 217, 0.6); }
	}

	.wp-rules {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 36rem;
		max-height: 80vh;
		overflow-y: auto;
		padding: 1.5rem 1.75rem;
		color: #fff;
		text-align: left;
		animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;

		/* custom scrollbar */
		&::-webkit-scrollbar {
			width: 5px;
		}
		&::-webkit-scrollbar-track {
			background: rgba(255, 255, 255, 0.04);
			border-radius: 4px;
		}
		&::-webkit-scrollbar-thumb {
			background: linear-gradient(180deg, #ff7ad9 0%, #ffd34d 100%);
			border-radius: 4px;
		}

		h2 {
			margin: 0 0 0.35rem;
			text-align: center;
			font-size: 1.65rem;
			font-weight: 800;
			letter-spacing: 0.08em;
			background: linear-gradient(135deg, #ffd34d 0%, #ff7ad9 50%, #a855f7 100%);
			background-size: 200% auto;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			animation: shimmer 4s linear infinite;
			filter: drop-shadow(0 0 18px rgba(255, 122, 217, 0.5));
		}
	}

	.wp-card {
		padding: 0.85rem 1rem;
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
		animation: cardFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;

		&:nth-child(2) { animation-delay: 0.05s; }
		&:nth-child(3) { animation-delay: 0.1s; }
		&:nth-child(4) { animation-delay: 0.15s; }
		&:nth-child(5) { animation-delay: 0.2s; }
		&:nth-child(6) { animation-delay: 0.25s; }

		&:hover {
			background: rgba(255, 122, 217, 0.05);
			border-color: rgba(255, 122, 217, 0.15);
			box-shadow: 0 0 16px rgba(255, 122, 217, 0.08);
		}

		h3 {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin: 0 0 0.35rem;
			font-size: 1.05rem;
			font-weight: 700;
			color: #ff7ad9;
		}

		p {
			margin: 0;
			font-size: 0.88rem;
			line-height: 1.55;
			opacity: 0.88;
			padding-left: 0.9rem;
		}
	}

	.wp-accent-bar {
		display: inline-block;
		width: 3px;
		height: 1.1em;
		border-radius: 2px;
		background: linear-gradient(180deg, #ff7ad9, #a855f7);
		flex-shrink: 0;
		animation: accentPulse 3s ease-in-out infinite;
	}

	.wp-divider {
		width: 60%;
		height: 1px;
		margin: 0.25rem auto;
		background: linear-gradient(90deg, transparent, rgba(255, 122, 217, 0.3), rgba(255, 211, 77, 0.2), transparent);
	}

	.wp-foot {
		margin: 0;
		font-size: 0.75rem;
		opacity: 0.5;
		text-align: center;
		line-height: 1.45;
		letter-spacing: 0.02em;
	}
</style>
