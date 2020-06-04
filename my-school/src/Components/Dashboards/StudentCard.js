import React, { useState } from "react";
import { Flex, Image, IconButton, Heading, Text, Box } from "@chakra-ui/core";
import placeholder from "../../assets/placeholder_img.png";

const StudentCard = ({ student }) => {
  return (
    <Flex width="25vw" direction="column">
      <Flex>
        <Image src={placeholder} size="50px" rounded="full" flexWrap="wrap" />
        <Heading as="h3" width="100%">
          Timmy's Portfolio
        </Heading>
        <Text>TIMOTHY HARRISON</Text>
      </Flex>
      <Text>LAST ACTIVITY</Text>
      <Text>04/12/2020 SUBMITTED "GEORGE WASHINGTON ESSAY"</Text>
      <IconButton icon="arrow-right" />
    </Flex>
  );
};

export default StudentCard;
