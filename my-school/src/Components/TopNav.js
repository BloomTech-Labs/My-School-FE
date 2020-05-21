import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Avatar,
  Heading,
  IconButton,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  Button,
  MenuList,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";

export default function TopNav() {
  const [user, setUser] = useState({});

  useEffect(() => {
    //the user will not be hard coded once we add dynamic routes and logins
    axios
      .get("https://my-school-v1.herokuapp.com/api/users/3")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="top-nav">
      <Box bg="lightblue" w="100%">
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          padding=".1% 2%"
        >
          <Flex align="flex-start">
            {/* logo link to landing page? */}
            <Link to="/">
              <Image
                src="https://myschoolathome.io/static/media/logo100-100.ba4f14e7.svg"
                alt="MySchool logo"
                size="70%"
              />
            </Link>
          </Flex>
          <Flex align="center">
            {/* Image linked to current user account https://my-school-v1.herokuapp.com/api/users/3/ */}
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

            {/* Name linked to current user account https://my-school-v1.herokuapp.com/api/users/3/*/}
            <Heading as="h3" size="md" alt="user name">
              {`${user.name} ${user.familyName}`}
            </Heading>

            {/* Gear icon for parent users -- route body to account settings */}
            {/* <IconButton
              variantColor="teal"
              aria-label="Account Settings"
              icon="settings"
              size="sm"
            /> */}
          </Flex>
        </Flex>
      </Box>
    </nav>
  );
}
