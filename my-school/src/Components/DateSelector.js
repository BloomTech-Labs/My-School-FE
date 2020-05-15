import React, { useState } from 'react';
import moment from 'moment';
import {
    FormControl,
    FormLabel,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/core';

const DateSelector = () => {
    // Sets default date values based on current date
    const currentMonth = moment().month() + 1; 
    const currentDate = moment().date();
    const currentYear = moment().year();

    // Uses Moment Library to create months array with month number, name & length (# of days)
    const rangeStart = moment().startOf('year');
    const rangeEnd = moment().endOf('year');

    const months = [];

    let dateIterator = moment(rangeStart);
    while (dateIterator.isBefore(rangeEnd) || dateIterator.isSame(rangeEnd)) {
        const endOfMonth = moment(dateIterator).endOf('month');
        months.push({
            num: dateIterator.month() + 1,
            length: endOfMonth.date(),
            name: dateIterator.format('MMMM')
        });
        dateIterator.add(1, 'month');
    }
    
    // Month state
    const [month, setMonth] = useState(months.find(m => m.num === currentMonth));

    const handleMonthChange = e => {
        setMonth(months.find(m => m.num == e.target.value))
    }

    return (
        <>
            <FormControl>
                <FormLabel htmlFor="month">Month</FormLabel>
                <Select id="month" defaultValue={month ? month.num : 1} onChange={handleMonthChange}>
                    {months.map(month => {
                        return (
                            <option value={month.num} key={month.num}>{month.name}</option>
                        )
                    })}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="day">Day</FormLabel>
                <NumberInput id="day" defaultValue={currentDate} min={1} max={month ? month.length : 31}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="year">Year</FormLabel>
                <NumberInput id="year" defaultValue={currentYear} max={currentYear + 10} min={currentYear - 100}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </>
    )
}

export default DateSelector;