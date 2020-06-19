import React from "react";
import { Flex, Box, Avatar, IconButton, Heading, Text } from "@chakra-ui/core";

const ProfilePicture = ({ thumbnail, renderedUser }) => {
  const handleImage = () => {
    document.getElementById("profilepic").click();
  };

  return (
    <Flex paddingLeft="7rem" direction="row" margin="20px" flexWrap="wrap">
      <Box paddingRight="1rem">
        {thumbnail ? <Avatar src={thumbnail} margin="10px" /> : null}
        {!thumbnail ? (
          <Avatar src={renderedUser.profile_picture} margin="10px" />
        ) : null}
        <IconButton size="sm" icon="edit" onClick={handleImage} />
      </Box>
      <Box>
        <Heading>{renderedUser.username}</Heading>
        <Text fontsize="lg">
          {renderedUser.user_type_id === 1
            ? "Primary Account"
            : `${renderedUser.name}'s Account`}
        </Text>
      </Box>
    </Flex>
  );
};

export default ProfilePicture;
