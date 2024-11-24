import { defineConfig } from "@solidjs/start/config";
import { staticPaths } from "./src/scripts/staticPaths";

export default defineConfig({
	server: {
		prerender: {
			routes: [...staticPaths, "/"],
			failOnError: true,
		},
	},
});
