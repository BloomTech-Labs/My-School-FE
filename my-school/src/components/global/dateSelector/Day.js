import React from 'react'
import {FormControl, FormLabel, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper} from '@chakra-ui/core'

const Day = ({methods, defaultDate, currentDate, month }) => {

    return(
        
        <FormControl w="25%" pr="8px">
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
                borderColor="gray.400"
                errorBorderColor="warningred" 
                focusBorderColor="myschoolblue"
            />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </FormControl>
    )
}

export default Day