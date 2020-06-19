import React from 'react'
import {MenuButton, Button, Avatar} from '@chakra-ui/core'
import NavIcon from './NavIcon'

const NavMenuButton = ({user}) => {
    
    return (
        <MenuButton as={Button} bg='transparent' color="black" variantColor='btnBlue' height="auto" p="0" mr="30px">
        <NavIcon user={user} />
        <Avatar size="md" src={user.profile_picture} alt="Your profile picture" ml="16px" border="2px" borderColor="lightblue" />
      </MenuButton>
    )
}
export default NavMenuButton