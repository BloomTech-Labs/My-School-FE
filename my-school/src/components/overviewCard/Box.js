import React from 'react'
import PlaceholderImg from "../../assets/placeholder_img.png";
import {Box as CHBox, Text, Image} from '@chakra-ui/core'

const Box = ({props}) => {

    return(
        <CHBox width="35%" height="70%">
        <Text fontWeight="900">Attached Images: </Text>
        <CHBox border="1px solid #e8e8e8" padding="10px" height="100%">
          <Image
            w="auto"
            h="100px"
            src={props.activity.photo}
            borderRadius="2rem"
            fallbackSrc={PlaceholderImg}
          />
        </CHBox>
      </CHBox>
    )
}

export default Box