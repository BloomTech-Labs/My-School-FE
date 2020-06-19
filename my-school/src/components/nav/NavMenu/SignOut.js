import React from 'react'
import {useHistory} from 'react-router-dom'
import {MenuItem, Text, Image} from '@chakra-ui/core'
import logoutIcon from '../../../assets/icons/logout_icon.png'

const SignOut = ({logout}) => {
    const history = useHistory()

    const handleLogout = e => {
        e.preventDefault();
        logout();
        localStorage.clear();
        history.push('/login');
      }

    return (
        <MenuItem bg="gray.100" h="70px" onClick={handleLogout}>
        <Text w="95%" fontSize="sm" fontWeight="bold" color="gray.700" textTransform="uppercase">Sign Out</Text>
        <Image src={logoutIcon} alt="Sign out icon" w="1.125rem" display="block" />
      </MenuItem>

    )
}

export default SignOut
