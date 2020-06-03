import React, { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import {
  Menu,
  MenuButton,
  Box,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Text,
  Image,
  Flex
} from "@chakra-ui/core";
import axios from 'axios';
import NavName from './NavName';
import LogoutIcon from '../../../assets/icons/logout_icon.png';
import PlusIcon from '../../../assets/icons/plus_icon.png';

const NavMenu = ({user, family}) => {
  // console.log({user});

  const history = useHistory();
  const [ students, setStudents ] = useState([]);

  useEffect(() =>{
        //the user will not be hard coded once we add dynamic routes and logins

    axios.get(`https://my-school-v1.herokuapp.com/api/families/4`)
    .then( res=> {
      console.log('navmenu', res.data.people)
      setStudents(res.data.people.filter(p => p.user_type_id === 2))
    })
  }, []);

  const handleAdminSettings = () => {
    history.push('/settings')
  }

  const manageStudent =(e) => { 
    e.preventDefault();
    const id = e.target.value;
    history.push(`/settings/${id}`)
  }

  const handleAddStudent = () => {
    history.push('/addstudent')
  }

  // Logout click handler...currently removes everything in localstorage but could be updated to be more specific
  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    history.push('/login');
  }
  
  return (
      <Menu>
        {/* MenuButton is the trigger to open the MenuList */}
        <MenuButton as={Button} bg='transparent' color="black" variantColor='btnBlue'>
          <NavName user={user}/>
          <Avatar size="md" src={user.profile_picture} alt="Your profile picture" ml="16px" border="2px" borderColor="lightblue" />
        </MenuButton>
        {/* MenuList is the wrapper for MenuItems */}
        <MenuList p="0" mx="24px" w="315px" boxShadow="0px 40px 80px rgba(0, 0, 0, 0.12)">

          {/* ACCOUNT INFO & SETTINGS */}
          <Flex flexDirection="row" w="100%" pt="24px" px="24px" bg="white" align="center">
              <Avatar size="md" src={user.profile_picture} alt="Your profile picture" border="2px" borderColor="myschoolblue" mr="12px"/>
              <Flex flexDirection="column">
                <Text fontSize="1.125" fontWeight="bold" color="myschoolblue">{user.name}</Text>
                <Text fontSize="0.625rem" color="gray.600" textTransform="uppercase">{user.user_type_id === 1 ? `Primary Account` : `Student Account`}</Text>
              </Flex>
            </Flex>
            {user.user_type_id === 1 && <MenuItem fontSize="sm" color="gray.700" px="24px" mt="12px" py="12px" onClick={handleAdminSettings}>Account Settings</MenuItem>}

          <MenuDivider color="gray.300" m="0" />

          {/* LIST OF STUDENT ACCOUNTS IF PARENT ACCOUNT */}
          {user.user_type_id === 1 && 
            <>
            {/* STUDENT ACCOUNT MANAGEMENT */}
            <MenuGroup title={`${user.familyName} Family`} fontSize="1.125" color="gray.800" fontWeight="bold" mx="24px" mt="20px" mb="12px" p="0">
              {/* EXISTING STUDENT ACCOUNTS */}
              {students.length > 0 ? 
              students.map(s => {
                return (
                  <MenuItem key={s.id} py="8px" pl="24px">
                    <Avatar size="sm" src={s.profile_picture} alt={`${s.name} profile picture`} />
                    <Flex flexDirection="column" ml="12px">
                      <Text fontSize="md" fontWeight="bold" color="gray.700">{s.name}</Text>
                      <Text fontSize="0.625rem" color="gray.500" textTransform="uppercase">Student Account</Text>
                    </Flex>
                    <Box as={Button} onClick={manageStudent} value={s.id} fontSize="0.625rem" color="myschoolblue" textTransform="uppercase" border="1px" borderColor="myschoolblue" borderRadius="4px" h="24px" w="56px" bg="white" ml="52px">Manage</Box>
                  </MenuItem>
                )
              })
              
              : <Text fontSize="sm" color="gray.700" py="8px" my="12px">No students have been added to your family yet</Text> } 

              {/* ADD STUDENT */}
              <MenuItem onClick={handleAddStudent} mt="8px" mb="56px" px="24px" py="8px">
                <Image src={PlusIcon} alt="add icon" w="1.375rem" />
                <Text fontSize="0.625rem" color="myschoolorange" fontWeight="bold" textTransform="uppercase" ml="12px">Add New</Text>
              </MenuItem>
            </MenuGroup>
            </>
          }
          {/* SIGN OUT */}
          <MenuItem bg="gray.100" h="70px" onClick={handleLogout}>
            <Text w="95%" fontSize="sm" fontWeight="bold" color="gray.700" textTransform="uppercase">Sign Out</Text>
            <Image src={LogoutIcon} alt="Sign out icon" w="1.125rem" display="block"/>
          </MenuItem>
        </MenuList>
      </Menu>
  )
};


export default NavMenu;
