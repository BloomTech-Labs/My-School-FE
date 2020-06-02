import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/core";
import NavMenu from "./NavMenu";
import NavName from "./NavName";
import NavLeft from "./NavLeft";

export default function TopNav() {
  const [user, setUser] = useState({});

  useEffect(() => {
    //the user will not be hard coded once we add dynamic routes and logins
    axios
      .get("https://my-school-v1.herokuapp.com/api/users/2")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="top-nav">
      <Box bg="blue.900" w="100%">
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          padding=".1% 2%"
        >
          <NavLeft />
          <Flex align="center">
            <NavMenu user={user} />
            <NavName user={user} />
          </Flex>
        </Flex>
      </Box>
    </nav>
  );
}
