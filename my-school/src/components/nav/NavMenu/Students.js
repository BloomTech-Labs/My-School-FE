import React from 'react'
import {MenuItem, Avatar, Flex, Text, Box} from '@chakra-ui/core'
import capitalizeName from '../../../utils/capitalizeName'
const Students = ({handleSettings, s}) => {

    return (
        <MenuItem key={s.id} value={s.id} py="8px" pl="24px" >
        <Avatar size="sm" src={s.profile_picture} alt={`${s.name} profile picture`} />
        <Flex flexDirection="column" ml="12px">
          <Text fontSize="md" fontWeight="bold" color="gray.700">{capitalizeName(s.name)}</Text>
          <Text fontSize="0.625rem" color="gray.500" textTransform="uppercase">Student Account</Text>
        </Flex>
        <Box fontSize="0.625rem" color="myschoolblue" textTransform="uppercase" border="1px" borderColor="myschoolblue" borderRadius="4px" h="24px" w="56px" bg="white" ml="52px">
          <Text pt="4px" pl="5px" onClick={()=>{handleSettings(s.id)}}>Manage</Text>
        </Box>
      </MenuItem>
    )
}

export default Students