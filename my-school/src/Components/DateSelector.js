import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import moment from 'moment';
import {
    Flex,
    FormControl,
    FormLabel,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/core';

const DateSelector = ({ defaultMonth, defaultDate, defaultYear }) => {
    // console.log("Date selector props:", props)
    const methods = useFormContext();

    // Gets current date values...used to set default value in input fields
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

    // Month state...sets max # of days user can enter based on what month user selects
    const [month, setMonth] = useState(months.find(m => m.num === currentMonth));

    const handleMonthChange = e => {
        setMonth(months.find(m => m.num === parseInt(e.target.value)))
    }

    return (
        <Flex w="372px">
            <FormControl w="40%" pr="1rem">
                <FormLabel htmlFor="month">Month</FormLabel>
                <Select 
                    id="month" 
                    name="month" 
                    defaultValue={defaultMonth || month.num} 
                    onChange={handleMonthChange} 
                    ref={methods.register} 
                >
                    {months.map(month => {
                        return (
                            <option value={month.num} key={month.num}>{month.name}</option>
                        )
                    })}
                </Select>
            </FormControl>

            <FormControl w="30%" pr="1rem">
                <FormLabel htmlFor="day">Day</FormLabel>
                <NumberInput 
                    defaultValue={defaultDate || currentDate} 
                    min={1} 
                    max={month ? month.length : 31}
                >
                    <NumberInputField 
                        id="day" 
                        name="day"
                        ref={methods.register}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <FormControl w="30%">
                <FormLabel htmlFor="year">Year</FormLabel>
                <NumberInput 
                    defaultValue={defaultYear || currentYear} 
                    max={currentYear + 10}
                    min={currentYear - 100}
                >
                    <NumberInputField 
                        id="year" 
                        name="year"
                        ref={methods.register}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </Flex>
    )
}

export default DateSelector;