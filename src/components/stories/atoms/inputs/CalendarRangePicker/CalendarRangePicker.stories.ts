import type { Meta, StoryObj } from "@storybook/react";

import CalendarRangePicker from "./CalendarRangePicker";
import DateTimeService from "@/utils/Datetime/DatetimeService";

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
    format: "year",
    dateMin: {
      date: "01/01/2023",
      format: "dd/MM/yyyy",
    },
    dateMax: DateTimeService.currentDate(),
    dateStart: DateTimeService.getDateLimits(
      DateTimeService.currentDate(),
      "year"
    ).dateStart,
    dateEnd: DateTimeService.getDateLimits(
      DateTimeService.currentDate(),
      "year"
    ).dateEnd,
    onChange: (event) => {
      console.log(event);
    },
  },
};
