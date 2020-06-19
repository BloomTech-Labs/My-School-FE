import React from 'react'
import {FormControl, FormLabel, Select} from '@chakra-ui/core'

const Month = ({defaultMonth, month, handleMonthChange, methods, months}) => {

    return (
        <FormControl w="40%" pr="8px">
                <FormLabel htmlFor="month">Month</FormLabel>
                <Select 
                    id="month" 
                    name="month" 
                    defaultValue={defaultMonth || month.num} 
                    onChange={handleMonthChange} 
                    ref={methods.register} 
                    borderColor="gray.400"
                >
                    {months.map(month => {
                        return (
                            <option value={month.num} key={month.num}>{month.name}</option>
                        )
                    })}
                </Select>
            </FormControl>
    )
}

export default Month