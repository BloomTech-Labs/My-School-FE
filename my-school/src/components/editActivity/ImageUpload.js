import React from 'react'
import {Box, Flex, Text, Button, Input, Image} from '@chakra-ui/core'
import placeholderImg from "../../assets/placeholder_img.png";

const ImageUpload = ({activity, setImage}) => {

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
      };

    return(
        <Box border="1px solid #f0f0f0">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginTop="15px"
          marginBottom="20px"
          width='90%'
          mx='auto'
        >
          {/* IMAGE UPLOAD */}
          <Text fontWeight="700">Current Image</Text>

          <Button
            variant="solid"
            border="none"
            variantColor='btnGray'
          >
            <label htmlFor="image" className="hover-label">
              Upload A File
        </label>
          </Button>

          <Input
            type="file"
            name="image"
            id="image"
            placeholder="Upload an image"
            onChange={handleImageUpload}
            padding="3px"
            style={{
              width: "0.1px",
              height: "0.1px",
              opacity: "0",
              overflow: "hidden",
              position: "absolute",
              zIndex: "-1",
            }}
          />
        </Flex>

        {/* IMAGE PREVIEW */}
        <Image
          src={activity.photo}
          alt={activity.name}
          fallbackSrc={placeholderImg}
          maxHeight="150px"
          mx="auto"
        />
      </Box>
    )
}

export default ImageUpload