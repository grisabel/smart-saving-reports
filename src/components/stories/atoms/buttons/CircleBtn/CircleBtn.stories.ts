import type { Meta, StoryObj } from "@storybook/react";

import CircleBtn from "./CircleBtn";

const meta = {
  title: "Atoms/Buttons/CircleBtn",
  component: CircleBtn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CircleBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Btn1: Story = {
  args: { iconName: "add" },
};

export const Btn2: Story = {
  args: { iconName: "edit" },
};

export const Btn3: Story = {
  args: { iconName: "delete" },
};
