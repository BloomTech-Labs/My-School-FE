import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import moment from "moment";
import { Flex } from "@chakra-ui/core";
import Month from "./Month";
import Day from "./Day";
import Year from "./Year";

const DateSelector = ({ defaultMonth, defaultDate, defaultYear }) => {
  const methods = useFormContext();

  // Gets current date values...used to set default value in input fields
  const currentMonth = moment().month() + 1;
  const currentDate = moment().date();
  const currentYear = moment().year();

  // Uses Moment Library to create months array with month number, name & length (# of days)
  const rangeStart = moment().startOf("year");
  const rangeEnd = moment().endOf("year");

  const months = [];

  let dateIterator = moment(rangeStart);
  while (dateIterator.isBefore(rangeEnd) || dateIterator.isSame(rangeEnd)) {
    const endOfMonth = moment(dateIterator).endOf("month");
    months.push({
      num: dateIterator.month() + 1,
      length: endOfMonth.date(),
      name: dateIterator.format("MMMM"),
    });
    dateIterator.add(1, "month");
  }

  // Month state...sets max # of days user can enter based on what month user selects
  const [month, setMonth] = useState(
    months.find((m) => m.num === currentMonth)
  );

  const handleMonthChange = (e) => {
    setMonth(months.find((m) => m.num === parseInt(e.target.value)));
  };

  return (
    <Flex maxWidth="372px">
      <Month
        defaultMonth={defaultMonth}
        month={month}
        handleMonthChange={handleMonthChange}
        methods={methods}
        months={months}
      />
      <Day
        methods={methods}
        defaultDate={defaultDate}
        currentDate={currentDate}
        month={month}
      />
      <Year
        defaultYear={defaultYear}
        currentYear={currentYear}
        methods={methods}
      />
    </Flex>
  );
};

export default DateSelector;
