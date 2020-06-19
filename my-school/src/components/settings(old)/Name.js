import React from 'react'
import {Flex, Text, FormLabel, Input} from '@chakra-ui/core'

const Name = ({user, handleInputs}) => {

    return(
        <Flex
        paddingLeft="7rem"
        className="settings-box"
        alignItems="center"
      >
        <Text paddingRight="1rem" w="10vw">
          Name:
        </Text>
        <FormLabel htmlFor="name"></FormLabel>
        <Input
          name="name"
          id="name"
          type="text"
          placeholder={`Enter name`}
          value={user.name}
          w="20vw"
          onChange={handleInputs}
        ></Input>
      </Flex>
    )
}

export default Name