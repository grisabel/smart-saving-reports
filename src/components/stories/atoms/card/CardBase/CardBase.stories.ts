import type { Meta, StoryObj } from "@storybook/react";

import CardBase from "./CardBase";

const meta = {
  title: "Atoms/Card/CardBase",
  component: CardBase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardBaseExample: Story = {
  args: { children: "Card Base" },
};
