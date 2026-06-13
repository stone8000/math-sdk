// @ts-ignore
import config from 'config-vite';
import { mergeConfig } from 'vite';

/** Stake Engine requires relative base paths in production uploads. */
export default mergeConfig(config(), { base: './' });
