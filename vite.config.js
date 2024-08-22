import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.join(__dirname, "/src"),
			"~": path.join(__dirname, "/node_modules"),
		},
	},
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData: `
	// 				@import "@/assets/scss/variables";
	// 				@import "@/assets/scss/fonts";
	// 				@import "@/assets/scss/helpers/mixins";
	// 				@import "@/assets/scss/helpers/placeholders";
	// 			`,
	// 		},
	// 	},
	// },
});
