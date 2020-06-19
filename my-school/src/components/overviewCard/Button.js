import React from 'react'
import {IconButton} from '@chakra-ui/core'

const Button = ({handleClick, props, icon}) => {

    return (
        <IconButton
        variantColor="btnBlue"
        color="white"
        fontSize='2rem'
        onClick={() => handleClick(props.index)}
        icon={icon}
      ></IconButton>
    )
}
export default Button