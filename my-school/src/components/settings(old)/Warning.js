import React from 'react'
import {Text, Icon} from '@chakra-ui/core'

const Warning = ({message}) => {

    return(
        <Text color="red.500" paddingLeft="21vw">
        <Icon name="warning" size="24px" color="red.500" /> 
        {message}
      </Text>
    )
}

export default Warning
