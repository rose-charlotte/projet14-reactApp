import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: "es2020",
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: "happy-dom",
        exclude: ["**/e2e-tests/**", "./node_modules", "./dist"],
    },
});
