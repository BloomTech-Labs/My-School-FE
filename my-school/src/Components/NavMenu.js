import React from "react";
import { Settings } from './Settings'
;import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  Icon,
  MenuGroup,
} from "@chakra-ui/core";

const NavMenu = ({ user }) => {
  return (
    <Menu>
      <MenuButton as={Button} bg="lightblue" color="black">
        <Avatar size="sm" src={user.profile_picture} alt="user avatar" />
      </MenuButton>
      <MenuList>
        <MenuItem>
        <Avatar size="sm" src={user.profile_picture} alt="user avatar" />
          {user.name}
        </MenuItem>
        <MenuGroup>
        <MenuItem>{/* Family Name */}</MenuItem>
        <MenuItem>{/* child avatar, name,*/}<Button>Manage</Button></MenuItem>
        <MenuItem></MenuItem>{/* add new button */}
        </MenuGroup>
        <MenuItem as={Button} >Sign Out</MenuItem>
        
      </MenuList>

    </Menu>
  );
};

export default NavMenu;
