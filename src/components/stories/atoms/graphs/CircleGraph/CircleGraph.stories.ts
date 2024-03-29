import type { Meta, StoryObj } from "@storybook/react";

import CircleGraph from "./CircleGraph";

const meta = {
  title: "Atoms/Graphs/CircleGraph",
  component: CircleGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CircleGraph>;

export default meta;
type Story = StoryObj<typeof meta>;
const generateContrastingColor = (iconName: string) => {
  const iconHash = Array.from(iconName).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const highValue = Math.floor(iconHash % (256 - 129)) + 129;

  const midValueBase = Math.floor(iconHash % 256);
  const lowValueBase = Math.floor(iconHash % 128);

  const midValue = midValueBase;
  const lowValue = lowValueBase;

  let [r, g, b] = [midValue, midValue, midValue];
  const highComponent = iconName.length % 3;
  switch (highComponent) {
    case 0:
      r = highValue;
      g = iconName.length % 2 === 0 ? lowValue : midValue;
      b = g === midValue ? lowValue : midValue;
      break;
    case 1:
      g = highValue;
      r = iconName.length % 2 === 0 ? lowValue : midValue;
      b = r === midValue ? lowValue : midValue;
      break;
    case 2:
      b = highValue;
      r = iconName.length % 2 === 0 ? lowValue : midValue;
      g = r === midValue ? lowValue : midValue;
      break;
  }

  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return "#" + toHex(r) + toHex(g) + toHex(b);
};
const data = [
  {
    name: "bets",
    value: 700,
    background: generateContrastingColor("bets"),
    nameCategory: " PRUEBA",
  },
  {
    name: "fuel",
    value: 650,
    background: generateContrastingColor("fuel"),
    nameCategory: " PRUEBA",
  },
  {
    name: "car",
    value: 569,
    background: generateContrastingColor("car"),
    nameCategory: " PRUEBA",
  },
  {
    name: "health",
    value: 470,
    background: generateContrastingColor("health"),
    nameCategory: " PRUEBA",
  },
  {
    name: "restaurant",
    value: 470,
    background: generateContrastingColor("restaurant"),
    nameCategory: " PRUEBA",
  },
  {
    name: "pets",
    value: 430,
    background: generateContrastingColor("pets"),
    nameCategory: " PRUEBA",
  },
  {
    name: "tax",
    value: 356,
    background: generateContrastingColor("tax"),
    nameCategory: " PRUEBA",
  },
  {
    name: "studies",
    value: 355,
    background: generateContrastingColor("studies"),
    nameCategory: " PRUEBA",
  },
  {
    name: "water",
    value: 342.9,
    background: generateContrastingColor("water"),
    nameCategory: " PRUEBA",
  },
  {
    name: "mortgage",
    value: 0,
    background: generateContrastingColor("mortgage"),
    nameCategory: " PRUEBA",
  },
  {
    name: "scholarship",
    value: 0,
    background: generateContrastingColor("scholarship"),
    nameCategory: " PRUEBA",
  },
  {
    name: "studies",
    value: 0,
    background: generateContrastingColor("studies"),
    nameCategory: " PRUEBA",
  },
];

const dataGraph = {
  data: data,
  isDots: true,
};
export const CircleGraphExample: Story = {
  args: { ...dataGraph },
};
