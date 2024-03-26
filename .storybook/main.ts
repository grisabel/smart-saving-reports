import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    // Retorna tu configuración personalizada de Vite aquí
    return mergeConfig(config, {
      resolve: {
        alias: {
          // Configura tus alias aquí
          "@": path.resolve(__dirname, "../src"),
        },
      },
    });
  },
};
export default config;
