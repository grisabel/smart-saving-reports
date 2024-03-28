import type { Meta, StoryObj } from "@storybook/react";

import DataCard from "./DataCard";

const meta = {
  title: "Atoms/Card/DataCard",
  component: DataCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataCardExpenseExample: Story = {
  args: {
    date: "09/09/2023",
    amount: 500,
    comment: "Mercadona y Leroy merlin, ikea y muchas cosas mas",
    type: "expense",
  },
};
export const DataCardIncomeExample: Story = {
  args: {
    date: "09/09/2023",
    amount: 500,
    comment: "Mercadona",
    type: "income",
  },
};
