import React from "react";
import {Flex, Avatar, Text} from '@chakra-ui/core'

const AccountInfo = ({user}) => {
  return (
    <Flex
      flexDirection="row"
      w="100%"
      pt="24px"
      px="24px"
      bg="white"
      align="center"
    >
      <Avatar
        size="md"
        src={user.profile_picture}
        alt="Your profile picture"
        border="2px"
        borderColor="myschoolblue"
        mr="12px"
      />
      <Flex flexDirection="column">
        <Text fontSize="1.125" fontWeight="bold" color="myschoolblue">
          {user.name !== null ? `${user.name}` : `Your Account`}
        </Text>
        <Text fontSize="0.625rem" color="gray.600" textTransform="uppercase">
          {user.user_type_id === 1 ? `Primary Account` : `Student Account`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default AccountInfo