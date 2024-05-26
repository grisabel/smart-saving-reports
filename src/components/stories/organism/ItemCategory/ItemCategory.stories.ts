import type { Meta, StoryObj } from "@storybook/react";

import ItemCategory from "./ItemCategory";

const meta = {
  title: "Organism/ItemCategory",
  component: ItemCategory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ItemCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const itemExpenseExapmle: Story = {
  args: {
    amount: 500,
    type: "expense",
    categoryName: "Apuestas",
    category: "bets",
  },
};

export const itemIncomeExapmle: Story = {
  args: {
    amount: 500,
    type: "income",
    categoryName: "Hipoteca / Alquiler / Comunidad",
    category: "car",
  },
};
