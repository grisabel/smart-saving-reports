import type { Meta, StoryObj } from "@storybook/react";

import ItemListCategory from "./ItemListCategory";

const meta = {
  title: "Organism/ItemListCategory",
  component: ItemListCategory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ItemListCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ItemListCategoriesExpenseExample: Story = {
  args: {
    items: [
      {
        amount: 100,
        category: "food",
        categoryName: "Comida",
        type: "expense",
        onClick: () => console.log("Comida clicked!"),
      },
      {
        amount: 50,
        category: "studies",
        categoryName: "Servicios",
        type: "expense",
        onClick: () => console.log("Servicios clicked!"),
      },
      {
        amount: 100,
        category: "food",
        categoryName: "Comida",
        type: "expense",
        onClick: () => console.log("Comida clicked!"),
      },
      {
        amount: 50,
        category: "studies",
        categoryName: "Servicios",
        type: "expense",
        onClick: () => console.log("Servicios clicked!"),
      },
    ],
  },
};

export const ItemListCategoriesIncomeExample: Story = {
  args: {
    items: [
      {
        amount: 100,
        category: "food",
        categoryName: "Comida",
        type: "income",
        onClick: () => console.log("Comida clicked!"),
      },
      {
        amount: 50,
        category: "studies",
        categoryName: "Servicios",
        type: "income",
        onClick: () => console.log("Servicios clicked!"),
      },
      {
        amount: 100,
        category: "food",
        categoryName: "Comida",
        type: "income",
        onClick: () => console.log("Comida clicked!"),
      },
      {
        amount: 50,
        category: "studies",
        categoryName: "Servicios",
        type: "income",
        onClick: () => console.log("Servicios clicked!"),
      },
    ],
  },
};
