import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		// TanStackRouterVite scans the routes directory during plugin init; that
		// scan can interfere with Vitest's module loader for .tsx files before
		// Vite's transform runs. Skip it (and the static-copy plugin) in tests —
		// neither is needed for the jsdom environment.
		...(process.env.VITEST
			? []
			: [
					TanStackRouterVite(),
					viteStaticCopy({
						targets: [
							{
								src: normalizePath(path.resolve("./src/assets/locales")),
								dest: normalizePath(path.resolve("./dist")),
							},
						],
					}),
				]),
	],
	server: {
		host: true,
		strictPort: true,
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
	},
});
