import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Heading, Flex, Icon } from "@chakra-ui/core";
import axios from "axios";

const PortfolioHeader = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("https://my-school-v1.herokuapp.com/api/users/3")
      .then((response) => {
        if (response.user_type_id === 1) {
          setTitle([response.data.name] + "'s Portfolio");
        } else {
          setTitle("My Portfolio");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Flex margin="2% 4%" justify="space-between">
      {/* TITLE  -- based on user type and name*/}
      <Link to="/portfolio">
        <Heading as="h2">{title}</Heading>
      </Link>
      <Flex width="25%" justify="space-evenly">
        <Link to="/add">
          <Button leftIcon="add" variantColor="teal" variant="solid">
            Add Activity
          </Button>
        </Link>

        {/*  EXPORT BUTTON -- PARENTS ONLY? */}
        <Link to="/doc">
          <Button leftIcon="download" variantColor="teal" variant="solid">
            Convert to PDF
          </Button>
        </Link>
      </Flex>

      {/*  Start with opening in another tab, then download. */}
      {/*SEARCH BOX AND SORT/FILTER FEATUREs WILL GO HERE*/}
      {/* future -- activity tracker? */}
    </Flex>
  );
};

export default PortfolioHeader;
