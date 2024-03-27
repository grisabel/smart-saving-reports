import type { Meta, StoryObj } from "@storybook/react";

import CalendarRangePicker from "./CalendarRangePicker";

const meta = {
  title: "Atoms/Inputs/CalendarRangePicker",
  component: CalendarRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalendarRangePickerExample: Story = {
  args: {
    label: "Back Link",
  },
};
