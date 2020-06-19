import React from 'react'
import {Flex, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/core'

const Duration = ({register}) => {

    return (
        <Flex>
        <FormControl mt="8px" fontFamily="'Nunito'">
          <FormLabel
            htmlFor="hours"
            textTransform="uppercase"
            fontSize="0.625rem"
            color="gray.700"
          >
            Hours
          </FormLabel>
          <NumberInput
            mr="20px"
            min={0}
            defaultValue={0}
            data-testid="hours"
          >
            <NumberInputField
              id="hours"
              name="hours"
              w="72px"
              mr="0px"
              borderColor="gray.400"
              errorBorderColor="warningred"
              focusBorderColor="myschoolblue"
              ref={register}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl mt="8px" fontFamily="'Nunito'">
          <FormLabel
            htmlFor="minutes"
            textTransform="uppercase"
            fontSize="0.625rem"
            color="gray.700"
          >
            Minutes
          </FormLabel>
          <NumberInput
            max={59}
            min={0}
            defaultValue={0}
            data-testid="minutes"
          >
            <NumberInputField
              id="minutes"
              name="minutes"
              w="72px"
              borderColor="gray.400"
              errorBorderColor="warningred"
              focusBorderColor="myschoolblue"
              ref={register}
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

export default Duration