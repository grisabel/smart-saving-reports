import type { Meta, StoryObj } from "@storybook/react";

import CategoryCard from "./CategoryCard";

const meta = {
  title: "Organism/CategoryCard",
  component: CategoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const categoryCardexpenseExample: Story = {
  args: {
    amount: 500,
    type: "expense",
    categoryName: "Apuestas",
    category: "bets",
  },
};

export const categoryCardincomeExample: Story = {
  args: {
    amount: 500,
    type: "income",
    categoryName: "Hipoteca / Alquiler / Comunidad",
    category: "car",
  },
};
