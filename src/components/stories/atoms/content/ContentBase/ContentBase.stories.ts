import type { Meta, StoryObj } from "@storybook/react";

import ContentBase from "./ContentBase";

const meta = {
  title: "Atoms/content/ContentBase",
  component: ContentBase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContentBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentBaseExample: Story = {
  args: { children: "Content Example" },
};
