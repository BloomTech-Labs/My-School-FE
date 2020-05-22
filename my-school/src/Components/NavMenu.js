import React from "react";
import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/core";

const NavMenu = ({ user }) => {
  return (
    <Menu>
      <MenuButton as={Button} bg="lightblue" color="black">
        <Avatar size="sm" src={user.profile_picture} alt="user avatar" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Icon
            aria-label="Account Settings"
            name="settings"
            size="18px"
            color="darkgray"
            margin="10px"
          />
          Settings
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
