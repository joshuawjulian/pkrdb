import type { Options } from 'tsup';

const config: Options = {
	entry: ['src/**/*.ts', '!src/**/*.test.*'],
	splitting: false,
	sourcemap: true,
	clean: true,
	format: ['esm'],
	dts: true,
};

export default config;
