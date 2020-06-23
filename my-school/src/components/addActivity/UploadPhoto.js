import React, { useState } from "react";
import { Text, FormLabel, Flex, Box, Input, Image } from "@chakra-ui/core";

const UploadPhoto = ({ setImage, image }) => {
  const [thumbnail, setThumbnail] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setThumbnail(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Text fontSize="lg" fontWeight="700" pb="24px">
        Upload Activity Photo
      </Text>
      <FormLabel htmlFor="image" style={{ cursor: "pointer" }}>
        <Flex align="center" mb="12px">
          <Box
            bg="gray.600"
            p="8px 16px"
            borderRadius="4px"
            color="white"
            fontSize="lg"
            mr="8px"
          >
            Choose File
          </Box>
          <Text fontSize="lg" color="gray.700">
            {image ? `${image.name}` : `No file selected`}
          </Text>
        </Flex>
      </FormLabel>
      <Input
        type="file"
        name="image"
        id="image"
        placeholder="Upload an image"
        onChange={handleImageUpload}
        fontFamily="'Nunito'"
        style={{ display: "none", cursor: "pointer" }}
        data-testid="image"
      />
      <Box
        h="280px"
        border="1px"
        borderRadius="8px"
        borderColor="gray.400"
        p="24px"
        w="100%"
      >
        <Text fontSize="sm" color="gray.600" pb="22px">
          Attached photo:
        </Text>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt="preview of image selected to upload"
            maxHeight="200px"
            pb="22px"
          />
        ) : null}
      </Box>
    </>
  );
};

export default UploadPhoto;
