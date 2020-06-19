import React from 'react'
import {Box, Text, Flex, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/core'

const Duration = ({defaultHour, register, defaultMin}) => {

    return(
        <Box
        border="1px solid #f0f0f0"
        marginBottom="15px"
        padding="5px"
      >
        <Text style={{ fontWeight: "700" }} textAlign="center">
          Duration
        </Text>
        <Flex justifyContent="center" textAlign="center">
          {/* HOURS */}
          <FormControl>
            <FormLabel
              htmlFor="hours"
              style={{ fontWeight: "600" }}
            >
              Hours
            </FormLabel>
            <NumberInput
              defaultValue={defaultHour}
              w="120px"
              mr="32px"
            >
              <NumberInputField
                id="hours"
                name="hours"
                ref={register}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          {/* MINUTES */}
          <FormControl marginBottom="20px">
            <FormLabel
              htmlFor="minutes"
              style={{ fontWeight: "600" }}
            >
              Minutes
            </FormLabel>
            <NumberInput
              defaultValue={defaultMin}
              max={59}
              w="120px"
            >
              <NumberInputField
                id="minutes"
                name="minutes"
                ref={register}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>
      </Box>
    )
}

export default Duration