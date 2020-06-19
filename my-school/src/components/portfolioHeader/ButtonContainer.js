import React from 'react'
import {Flex} from '@chakra-ui/core'
import Button from './Button'

const ButtonContainer = ({isParent, studentId}) => {

    return(
        <Flex width="30%" justify="space-evenly">
        <Button text="Add Activity" icon="add" location={`/portfolio/${studentId}/add`} />
          {isParent ?
          <Button icon="download" text="Export PDF" location={`/portfolio/${studentId}/export`} /> 
          : null} 
      </Flex>
    )
}

export default ButtonContainer