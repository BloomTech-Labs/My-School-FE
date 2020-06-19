import React from 'react'
import {Flex, Text} from '@chakra-ui/core'
import DateSelector from '../global/dateSelector'
import moment from 'moment'

const DateCompleted = ({activity}) => {
  const defaultMonth = moment(activity.completion_date).month() + 1;
  const defaultDate = moment(activity.completion_date).date();
  const defaultYear = moment(activity.completion_date).year();


    return (
        <Flex
        justifyContent="center"
        align="center"
        textAlign="center"
        fontWeight="700"
        marginBottom="10px"
        direction="column"
        border="1px solid #f0f0f0"
        padding="15px"
      >
        <Text marginBottom="10px">Completion Date:</Text>
        <DateSelector
          defaultMonth={defaultMonth}
          defaultDate={defaultDate}
          defaultYear={defaultYear}
        />
      </Flex>
    )
}

export default DateCompleted