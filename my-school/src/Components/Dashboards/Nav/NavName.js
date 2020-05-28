import React from 'react'
import {Heading} from '@chakra-ui/core'

const NavName = ({user}) => {
    return (
        <Heading as="h3" size="md" alt="user name">
        {`${user.name} ${user.familyName}`}
      </Heading>
    )
}

export default NavName