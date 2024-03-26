import type { Meta, StoryObj } from "@storybook/react";

import LinkBack from "./LinkBack";

const meta = {
  title: "Atoms/Links/LinkBack",
  component: LinkBack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LinkBack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Back Link",
  },
};
