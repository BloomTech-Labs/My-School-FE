import React from 'react'
import {Menu, MenuButton, Button, Avatar, MenuList, MenuItem, IconButton} from '@chakra-ui/core'

const NavMenu = ({user}) => {
    return (
        <Menu>
        <MenuButton as={Button} variantColor="transparent" color="black">
          <Avatar
            size="sm"
            src={user.profile_picture}
            alt="user avatar"
          />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <IconButton
              variantColor="transparent"
              aria-label="Account Settings"
              icon="settings"
              size="xs"
              color="darkgray"
            />
            Settings
          </MenuItem>
        </MenuList>
      </Menu>
    )
}

export default NavMenu