import type { Meta, StoryObj } from "@storybook/react";

import BalanceContent from "./BalanceContent";

const meta = {
  title: "Atoms/Content/BalanceContent",
  component: BalanceContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BalanceContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BalanceExpenseExample: Story = {
  args: {
    title: "Content Balance",
    amount: "500",
    type: "expense",
  },
};
export const BalanceIncomeExample: Story = {
  args: {
    title: "Content Balance",
    amount: "500",
    type: "income",
  },
};
