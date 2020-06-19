import React from 'react'
import {FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/core'

const Year = ({defaultYear, currentYear, methods}) => {

    return(
        <FormControl w="25%">
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

export default Year