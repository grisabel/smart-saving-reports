import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";
import CardBase from "../../card/CardBase";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { CalendarRangePickerProps } from "./CalendarRangePicker.types";
import { useEffect, useState } from "react";
import { DATE_FORMATS } from "@/utils/Datetime/constants";
import Icon from "../../Icon";

import styles from "./CalendarRangePicker.module.scss";
import CircleBtn from "../../buttons/CircleBtn/CircleBtn";
import { useTranslation } from "react-i18next";

const CalendarRangePicker: React.FC<CalendarRangePickerProps> = ({
  dateMax,
  dateMin,
  onlyRead,
  disableFormatChange,
  className,
  onChange = () => null,
  ...props
}) => {
  const { t } = useTranslation();

  const [isYear, setIsYear] = useState(props.isYear);
  const [format, setFormat] = useState<"year" | "month">("year" || "month");

  useEffect(() => {
    setFormat(props.format);
    setIsYear(props.format === "year");
  }, [props.format]);

  const [dateStart, setDateStart] = useState<DateTimeModel>(props.dateStart);
  const [disableDecrement, setDisableDecrement] = useState(false);

  const calculateMinDate = (value: DateTimeModel): DateTimeModel => {
    if (!dateMin) {
      return value;
    }
    const result = DateTimeService.validate(
      value,
      dateMin,
      DateTimeService.VALIDATE_SET.UNTIL
    );

    setDisableDecrement(result);
    return result ? dateMin : value;
  };

  useEffect(() => {
    if (props.dateStart) {
      const minDate = calculateMinDate(props.dateStart);
      setDateStart(minDate);
    }
  }, [dateMin, props.dateStart]);

  const [dateEnd, setDateEnd] = useState<DateTimeModel>(props.dateEnd);
  const [disableIncrement, setDisableIncrement] = useState(false);

  const calculateDateMax = (value: DateTimeModel): DateTimeModel => {
    if (!dateMax) {
      return value;
    }
    const resul = DateTimeService.validate(
      dateMax,
      value,
      DateTimeService.VALIDATE_SET.UNTIL
    );

    setDisableIncrement(resul);
    return resul ? dateMax : value;
  };

  useEffect(() => {
    if (props.dateEnd) {
      const maxDate = calculateDateMax(props.dateEnd);
      setDateEnd(maxDate);
    }
  }, [dateEnd, props.dateEnd]);

  const handleClick = () => {
    let format!: "year" | "month";
    let dateRangeUpdate!: { dateStart: DateTimeModel; dateEnd: DateTimeModel };

    if (isYear) {
      format = "month";
    } else {
      format = "year";
    }

    dateRangeUpdate = DateTimeService.getDateLimits(dateStart, format);

    onChange({
      dateStart: dateRangeUpdate.dateStart,
      dateEnd: dateRangeUpdate.dateEnd,
      format,
    });
  };

  const handleDecrement = () => {
    let unit!: "years" | "months";

    if (isYear) {
      unit = "years";
      const year = DateTimeService.toDate(dateEnd).getFullYear();
      onChange({
        dateStart: calculateMinDate({
          date: `01/01/${year - 1}`,
          format: DATE_FORMATS.Date,
        }),
        dateEnd: {
          date: `31/12/${year - 1}`,
          format: DATE_FORMATS.Date,
        },
        format: "year",
      });
    } else {
      unit = "months";
      onChange({
        dateStart: calculateMinDate(
          DateTimeService.calculatePastDate(dateStart, {
            amount: 1,
            unit,
          })
        ),
        dateEnd: DateTimeService.calculatePastDate(dateEnd, {
          amount: 1,
          unit,
        }),
        format: "month",
      });
    }
  };

  const handleIncrement = () => {
    let unit!: "years" | "months";

    if (isYear) {
      unit = "years";
    } else {
      unit = "months";
    }

    onChange({
      dateStart: DateTimeService.calculateFutureDate(dateStart, {
        amount: 1,
        unit,
      }),
      dateEnd: calculateDateMax(
        DateTimeService.calculateFutureDate(dateEnd, {
          amount: 1,
          unit,
        })
      ),
      format: format,
    });
  };

  const displayDate = () => {
    if (isYear) {
      return DateTimeService.parse(dateEnd, DATE_FORMATS.Year);
    } else {
      return DateTimeService.parse(dateEnd, DATE_FORMATS.Month);
    }
  };

  return (
    <div className={`${styles.CalendarRangePickerWP} ${className}`}>
      {!onlyRead && (
        <CircleBtn
          iconName="chevron-left"
          disabled={disableDecrement}
          onClick={handleDecrement}
        />
      )}
      <CardBase
        onClick={handleClick}
        disabled={onlyRead || disableFormatChange}
      >
        <div className={styles.container}>
          <div className={styles.data}>
            <p className={styles.title}>{isYear ? t("year") : t("month")}</p>
            <p className={styles.date}>{displayDate()}</p>
          </div>
          <div className={styles.icon}>
            <Icon name={isYear ? "calendar-year" : "calendar-month"} />
          </div>
        </div>
      </CardBase>
      {!onlyRead && (
        <CircleBtn
          iconName="chevron-right"
          disabled={disableIncrement}
          onClick={handleIncrement}
        />
      )}
    </div>
  );
};

export default CalendarRangePicker;
