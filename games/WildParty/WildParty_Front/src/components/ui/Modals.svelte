<script lang="ts">
	import type { Snippet } from 'svelte';

	// Reuse the shared modals for everything except the pay table / game rules,
	// which we override locally with WildParty-specific content.
	import ModalError from 'components-ui-html/src/components/ModalError.svelte';
	import ModalBetMenu from 'components-ui-html/src/components/ModalBetMenu.svelte';
	import ModalBuyBonus from 'components-ui-html/src/components/ModalBuyBonus.svelte';
	import ModalBuyBonusConfirm from 'components-ui-html/src/components/ModalBuyBonusConfirm.svelte';
	import ModalAutoSpin from 'components-ui-html/src/components/ModalAutoSpin.svelte';
	import ModalAutoSpinMessage from 'components-ui-html/src/components/ModalAutoSpinMessage.svelte';
	import ModalSettings from 'components-ui-html/src/components/ModalSettings.svelte';

	import ModalPayTable from './ModalPayTable.svelte';
	import ModalGameRules from './ModalGameRules.svelte';

	type Props = {
		version: Snippet;
	};

	const props: Props = $props();
</script>

<ModalError />
<ModalBetMenu />
<ModalBuyBonus />
<ModalBuyBonusConfirm />
<ModalAutoSpin />
<ModalAutoSpinMessage />
<ModalPayTable />
<ModalGameRules />
<ModalSettings />

<!-- version snippet retained for parity with the shared Modals API -->
<div style="display:none">{@render props.version()}</div>

<style lang="scss">
	:global(html) {
		font-size: 16px;
		@media screen and (max-width: 500px) {
			font-size: 50%;
		}
	}

	/* ═══════════════════════════════════════════════════════
	   WILD PARTY — Premium HTML-UI Design System
	   ───────────────────────────────────────────────────────
	   One coherent "party" palette (gold → pink → purple) shared
	   with ModalPayTable / ModalGameRules. Applied globally to
	   every shared HTML modal (settings, bet menu, buy bonus,
	   autospin, error) since their internals live in web-sdk and
	   can only be reached via the shared class names below:
	     .button              components-shared/Button.svelte
	     .rectangle           components-ui-html/BaseIcon.svelte
	     .pop-up-wrap         components-shared/Popup.svelte
	     .close-button        components-shared/Popup.svelte
	     .blur-layer          modal backdrop
	     .ui-popup-*          popup content wrappers
	   Everything is !important because we override compiled
	   web-sdk styles from outside the package.
	   ═══════════════════════════════════════════════════════ */

	:global(:root) {
		/* party palette */
		--wp-gold: #ffd34d;
		--wp-gold-deep: #ffaa00;
		--wp-pink: #ff7ad9;
		--wp-purple: #a855f7;
		/* surfaces */
		--wp-surface-1: rgba(255, 255, 255, 0.04);
		--wp-surface-2: rgba(255, 255, 255, 0.07);
		--wp-line: rgba(255, 122, 217, 0.18);
		--wp-line-strong: rgba(255, 122, 217, 0.45);
		/* the signature action gradient */
		--wp-accent-grad: linear-gradient(135deg, #ffd34d 0%, #ff7ad9 52%, #a855f7 100%);
		--wp-ease: cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* ─── Backdrop ─── */
	:global(.blur-layer) {
		background: radial-gradient(
			120% 120% at 50% 30%,
			rgba(40, 6, 60, 0.62) 0%,
			rgba(6, 0, 14, 0.82) 100%
		) !important;
		backdrop-filter: blur(6px) saturate(1.1) !important;
		-webkit-backdrop-filter: blur(6px) saturate(1.1) !important;
	}

	/* ─── Popup content panel ─── */
	:global(.ui-popup-standard-content-wrap) {
		position: relative;
		background: linear-gradient(
			180deg,
			rgba(28, 8, 50, 0.97) 0%,
			rgba(12, 3, 26, 0.98) 100%
		) !important;
		border: 1px solid var(--wp-line) !important;
		border-radius: 18px !important;
		padding: 1.6rem !important;
		box-shadow:
			0 24px 60px rgba(0, 0, 0, 0.7),
			0 0 100px rgba(168, 85, 247, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
	}
	/* hairline gradient frame on top edge for a premium "lit" feel */
	:global(.ui-popup-standard-content-wrap)::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 2px;
		border-radius: 18px 18px 0 0;
		background: var(--wp-accent-grad);
		opacity: 0.85;
		pointer-events: none;
	}

	/* ─── Modal heading text inside shared modals ─── */
	:global(.pop-up-wrap h1),
	:global(.pop-up-wrap h2),
	:global(.pop-up-wrap .title) {
		background: var(--wp-accent-grad) !important;
		background-size: 200% auto !important;
		-webkit-background-clip: text !important;
		background-clip: text !important;
		-webkit-text-fill-color: transparent !important;
		letter-spacing: 0.06em !important;
		filter: drop-shadow(0 0 14px rgba(255, 122, 217, 0.4));
	}

	/* ═══ Buttons ════════════════════════════════════════════
	   Two tiers:
	   • icon buttons (.rectangle inside .button) → glass chips
	   • primary action buttons (confirm / buy) → gradient fill
	   ════════════════════════════════════════════════════════ */

	/* icon-button glass chip */
	:global(.rectangle) {
		background: linear-gradient(
			160deg,
			rgba(48, 14, 78, 0.92) 0%,
			rgba(20, 5, 38, 0.96) 55%,
			rgba(34, 9, 58, 0.92) 100%
		) !important;
		border: 1px solid var(--wp-line) !important;
		border-radius: 13px !important;
		box-shadow:
			0 3px 14px rgba(120, 30, 200, 0.18),
			inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
		transition: transform 0.18s var(--wp-ease), border-color 0.2s ease,
			box-shadow 0.2s ease, background 0.2s ease !important;
	}
	:global(.button:hover .rectangle) {
		border-color: var(--wp-line-strong) !important;
		box-shadow:
			0 6px 22px rgba(200, 80, 255, 0.3),
			0 0 0 1px rgba(255, 211, 77, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
		transform: translateY(-1px);
	}
	:global(.button:active .rectangle) {
		border-color: rgba(255, 211, 77, 0.6) !important;
		box-shadow:
			0 1px 6px rgba(200, 80, 255, 0.3),
			inset 0 2px 5px rgba(0, 0, 0, 0.45) !important;
		transform: scale(0.96);
	}

	/* primary / confirm / submit action buttons → gradient fill + sheen */
	:global(.pop-up-wrap button.primary),
	:global(.pop-up-wrap button.confirm),
	:global(.pop-up-wrap button[type='submit']),
	:global(.pop-up-wrap .button-primary),
	:global(.pop-up-wrap .submit-button),
	:global(.pop-up-wrap .buy-button) {
		position: relative;
		overflow: hidden;
		background: var(--wp-accent-grad) !important;
		background-size: 180% auto !important;
		color: #1a0322 !important;
		font-weight: 800 !important;
		letter-spacing: 0.04em !important;
		border: none !important;
		border-radius: 12px !important;
		box-shadow:
			0 8px 24px rgba(255, 122, 217, 0.28),
			inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
		transition: transform 0.18s var(--wp-ease), box-shadow 0.2s ease,
			background-position 0.4s ease !important;
	}
	:global(.pop-up-wrap button.primary:hover),
	:global(.pop-up-wrap button.confirm:hover),
	:global(.pop-up-wrap button[type='submit']:hover),
	:global(.pop-up-wrap .button-primary:hover),
	:global(.pop-up-wrap .submit-button:hover),
	:global(.pop-up-wrap .buy-button:hover) {
		background-position: right center !important;
		transform: translateY(-2px);
		box-shadow:
			0 12px 30px rgba(255, 122, 217, 0.4),
			0 0 24px rgba(255, 211, 77, 0.25),
			inset 0 1px 0 rgba(255, 255, 255, 0.45) !important;
	}
	:global(.pop-up-wrap button.primary:active),
	:global(.pop-up-wrap button.confirm:active),
	:global(.pop-up-wrap button[type='submit']:active),
	:global(.pop-up-wrap .button-primary:active),
	:global(.pop-up-wrap .submit-button:active),
	:global(.pop-up-wrap .buy-button:active) {
		transform: translateY(0) scale(0.98);
	}
	/* moving sheen sweep across primary buttons */
	:global(.pop-up-wrap button.primary)::after,
	:global(.pop-up-wrap button.confirm)::after,
	:global(.pop-up-wrap button[type='submit'])::after,
	:global(.pop-up-wrap .button-primary)::after,
	:global(.pop-up-wrap .buy-button)::after {
		content: '';
		position: absolute;
		top: 0;
		left: -60%;
		width: 40%;
		height: 100%;
		background: linear-gradient(
			100deg,
			transparent,
			rgba(255, 255, 255, 0.55),
			transparent
		);
		transform: skewX(-20deg);
		animation: wpSheen 4.5s ease-in-out infinite;
		pointer-events: none;
	}
	@keyframes wpSheen {
		0%, 60% { left: -60%; }
		85%, 100% { left: 130%; }
	}

	/* secondary buttons (cancel / value steppers) → outlined glass */
	:global(.pop-up-wrap button.secondary),
	:global(.pop-up-wrap button.cancel),
	:global(.pop-up-wrap .button-secondary) {
		background: var(--wp-surface-1) !important;
		color: #fff !important;
		border: 1px solid var(--wp-line) !important;
		border-radius: 12px !important;
		font-weight: 700 !important;
		transition: all 0.2s var(--wp-ease) !important;
	}
	:global(.pop-up-wrap button.secondary:hover),
	:global(.pop-up-wrap button.cancel:hover),
	:global(.pop-up-wrap .button-secondary:hover) {
		background: rgba(255, 122, 217, 0.1) !important;
		border-color: var(--wp-line-strong) !important;
		box-shadow: 0 0 16px rgba(255, 122, 217, 0.18) !important;
	}

	/* ─── Close button (×) ─── */
	:global(.close-button) {
		color: rgba(255, 200, 245, 0.85) !important;
		transition: color 0.2s ease, text-shadow 0.2s ease, transform 0.2s var(--wp-ease) !important;
	}
	:global(.close-button:hover) {
		color: #fff !important;
		text-shadow: 0 0 14px rgba(255, 122, 217, 0.9) !important;
		transform: rotate(90deg) scale(1.1);
	}

	/* ─── Value pills / amounts (bet, balance, win figures in modals) ─── */
	:global(.pop-up-wrap .value),
	:global(.pop-up-wrap .amount),
	:global(.pop-up-wrap .bet-value) {
		color: var(--wp-gold) !important;
		font-weight: 800 !important;
		text-shadow: 0 0 12px rgba(255, 211, 77, 0.3);
	}

	/* ═══ Form controls ══════════════════════════════════════ */

	/* premium toggle switch (checkbox styled as a pill) */
	:global(.pop-up-wrap input[type='checkbox']) {
		appearance: none;
		-webkit-appearance: none;
		width: 2.6rem !important;
		height: 1.4rem !important;
		border-radius: 1rem !important;
		background: rgba(20, 5, 40, 0.9) !important;
		border: 1px solid var(--wp-line) !important;
		position: relative;
		cursor: pointer;
		transition: background 0.25s var(--wp-ease), border-color 0.25s ease !important;
		flex-shrink: 0;
	}
	:global(.pop-up-wrap input[type='checkbox'])::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 0.18rem;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #fff;
		transform: translateY(-50%);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
		transition: left 0.25s var(--wp-ease), background 0.25s ease;
	}
	:global(.pop-up-wrap input[type='checkbox']:checked) {
		background: var(--wp-accent-grad) !important;
		border-color: transparent !important;
	}
	:global(.pop-up-wrap input[type='checkbox']:checked)::after {
		left: calc(100% - 1.18rem);
		background: #1a0322;
	}

	/* text / number inputs & selects */
	:global(.pop-up-wrap input[type='text']),
	:global(.pop-up-wrap input[type='number']),
	:global(.pop-up-wrap select) {
		background: rgba(20, 5, 40, 0.85) !important;
		border: 1px solid var(--wp-line) !important;
		border-radius: 10px !important;
		color: #fff !important;
		padding: 0.4rem 0.7rem !important;
		transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
	}
	:global(.pop-up-wrap input:focus),
	:global(.pop-up-wrap select:focus) {
		border-color: var(--wp-line-strong) !important;
		outline: none !important;
		box-shadow: 0 0 0 3px rgba(255, 122, 217, 0.15) !important;
	}

	/* range slider (bet amount / autoplay count) */
	:global(.pop-up-wrap input[type='range']) {
		appearance: none;
		-webkit-appearance: none;
		height: 6px !important;
		border-radius: 3px !important;
		background: linear-gradient(90deg, var(--wp-pink), var(--wp-purple)) !important;
		outline: none;
	}
	:global(.pop-up-wrap input[type='range'])::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--wp-gold);
		border: 2px solid #fff;
		box-shadow: 0 0 10px rgba(255, 211, 77, 0.6);
		cursor: pointer;
		transition: transform 0.15s var(--wp-ease);
	}
	:global(.pop-up-wrap input[type='range']:hover)::-webkit-slider-thumb {
		transform: scale(1.15);
	}

	/* ─── Scrollbars (modal-wide) ─── */
	:global(::-webkit-scrollbar) {
		width: 6px;
		height: 6px;
	}
	:global(::-webkit-scrollbar-track) {
		background: rgba(10, 0, 20, 0.4);
		border-radius: 3px;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: linear-gradient(180deg, var(--wp-pink), var(--wp-purple));
		border-radius: 3px;
	}
	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(180deg, var(--wp-gold), var(--wp-pink));
	}

	/* ─── Accessibility: respect reduced motion ─── */
	@media (prefers-reduced-motion: reduce) {
		:global(.pop-up-wrap button.primary)::after,
		:global(.pop-up-wrap button.confirm)::after,
		:global(.pop-up-wrap button[type='submit'])::after,
		:global(.pop-up-wrap .button-primary)::after,
		:global(.pop-up-wrap .buy-button)::after {
			animation: none;
			display: none;
		}
		:global(.close-button:hover) {
			transform: none;
		}
	}
</style>
