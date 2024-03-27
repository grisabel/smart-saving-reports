import type { Meta, StoryObj } from "@storybook/react";

import CalendarRangePicker from "./CalendarRangePicker";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import {
  CalendarRangePickerChangeEvent,
  CalendarRangePickerProps,
} from "./CalendarRangePicker.types";
import { useState } from "react";

const CalendarRangePickerStory: React.FC<Partial<CalendarRangePickerProps>> = ({
  onlyRead,
  disableFormatChange,
  dateMin,
}) => {
  const [format, setFormat] = useState<"year" | "month">("year");
  const currentDate = DateTimeService.currentDate();
  const initialRange = DateTimeService.getDateLimits(currentDate, "year");
  const [range, setRange] = useState(initialRange);

  const handleOnChange = (event: CalendarRangePickerChangeEvent) => {
    setRange({
      dateStart: event.dateStart,
      dateEnd: event.dateEnd,
    });
    setFormat(event.format);
  };

  return (
    <CalendarRangePicker
      disableFormatChange={disableFormatChange}
      onlyRead={onlyRead}
      dateMin={dateMin}
      dateMax={currentDate}
      dateStart={range.dateStart}
      dateEnd={range.dateEnd}
      format={format}
      onChange={handleOnChange}
    />
  );
};

const meta = {
  title: "Atoms/Inputs/CalendarRangePicker",
  component: CalendarRangePickerStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarRangePickerStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalendarRangePickerMaxDate: Story = {
  args: {},
};

export const CalendarRangePickerMinDate: Story = {
  args: {
    dateMin: {
      date: "01/01/2023",
      format: "dd/MM/yyyy",
    },
  },
};

export const CalendarRangePickerOnlyRead: Story = {
  args: {
    onlyRead: true,
  },
};

export const CalendarRangePickerDisableFormatChange: Story = {
  args: {
    disableFormatChange: true,
  },
};
