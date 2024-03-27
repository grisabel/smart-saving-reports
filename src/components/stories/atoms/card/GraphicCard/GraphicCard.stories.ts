import type { Meta, StoryObj } from "@storybook/react";

import GraphicCard from "./GraphicCard";

const meta = {
  title: "Atoms/Card/GraphicCard",
  component: GraphicCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GraphicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GraphicExpensesExample: Story = {
  args: { amount: 500, type: "expense", description: "Gastos" },
};

export const GraphicIncomeExample: Story = {
  args: { amount: 500, type: "income", description: "Ingresos" },
};
