import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Heading, Flex } from "@chakra-ui/core";
import axios from "axios";
import HeaderButton from "./HeaderButton";

const PortfolioHeader = () => {
  const [title, setTitle] = useState("");
  let { pathname } = useLocation();

  const isButton = () => {
    return pathname === "/portfolio" ? false : true;
  };

  const id = 3

  useEffect(() => {
    axios
      .get(`https://my-school-v1.herokuapp.com/api/users/${Number(localStorage.getItem('userId'))}`)
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
      {isButton() ? (
        <HeaderButton
          text="Go To My Portfolio"
          icon="arrow-right"
          location="/dashboard"
        />
      ) : (
        <Heading as="h2">{title}</Heading>
      )}
      <Flex width="25%" justify="space-evenly">
        <HeaderButton text="Add Activity" icon="add" location={`/portfolio/${id}/add`} />
        {/*  EXPORT BUTTON -- PARENTS ONLY? */}
        <HeaderButton text="Convert to PDF" icon="download" location={`/portfolio/${id}/export`} />
      </Flex>
      {/*  Start with opening in another tab, then download. */}
      {/*SEARCH BOX AND SORT/FILTER FEATUREs WILL GO HERE*/}
      {/* future -- activity tracker? */}
    </Flex>
  );
};

export default PortfolioHeader;
