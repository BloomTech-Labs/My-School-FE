import React from "react";
import {useHistory} from 'react-router-dom'
import { MenuItem, Image, Text } from "@chakra-ui/core";
import plusIcon from "../../../assets/icons/plus_icon.png";

const AddStudent = () => {
  const history = useHistory();

  const handleAddStudent = () => {
    history.push("/add-student");
  };

  return (
    <MenuItem onClick={handleAddStudent} mt="8px" mb="56px" px="24px" py="8px">
      <Image src={plusIcon} alt="add icon" w="1.375rem" />
      <Text
        fontSize="0.625rem"
        color="myschoolorange"
        fontWeight="bold"
        textTransform="uppercase"
        ml="12px"
      >
        Add New
      </Text>
    </MenuItem>
  );
};

export default AddStudent