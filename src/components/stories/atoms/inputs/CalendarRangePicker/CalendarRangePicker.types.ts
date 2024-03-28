import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";

export interface CalendarRangePickerProps {
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
  dateMax?: DateTimeModel;
  dateMin?: DateTimeModel;

  format: "year" | "month";
  isYear?: boolean | null;
  onlyRead?: boolean;
  className?: string;
  disableFormatChange?: boolean;

  onChange: (value: CalendarRangePickerChangeEvent) => void;
}

export interface CalendarRangePickerChangeEvent {
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
  format: "year" | "month";
}
