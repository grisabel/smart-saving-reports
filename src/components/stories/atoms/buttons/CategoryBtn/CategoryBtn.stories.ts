import type { Meta, StoryObj } from "@storybook/react";

import CategoryBtn from "./CategoryBtn";

const meta = {
  title: "Atoms/Buttons/CategoryBtn",
  component: CategoryBtn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Btn1Example: Story = {
  args: { iconName: "bets" },
};

export const Btb2Example: Story = {
  args: { iconName: "car" },
};
