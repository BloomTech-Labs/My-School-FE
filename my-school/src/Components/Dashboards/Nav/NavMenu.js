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
} from "@chakra-ui/core";
import axios from 'axios';

const NavMenu = ({user, family}) => {

  const history = useHistory();
  const [ students, setStudents ] = useState([]);


  useEffect(() =>{
        //the user will not be hard coded once we add dynamic routes and logins

    axios.get(`https://my-school-v1.herokuapp.com/api/families/4`)
    .then( res=> {
      console.log('navmenu', res.data.people)
      setStudents(res.data.people)
    })
  }, []);

  const handleAdminSettings = () => {
    history.push('/settings')
  }

  const manageStudent =(e) => { 
    e.preventDefault();
    const id = e.target.value;
    history.push(`settings/${id}`)
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
  

  // If user is admin type, can see full menu; if user is student type, can only log out
  if(user.user_type_id === 1){
  return (
    <Menu>

      <MenuButton as={Button} bg="lightblue" color="black">
        <Avatar size="sm" src={user.profile_picture} alt="user avatar" />
      </MenuButton>

      <MenuList>
        <MenuItem>
{/*  THIS IS THE USERS IMAGE AND NAME */}
          <Avatar size="sm" src={user.profile_picture} alt="user avatar" />{user.name}
        </MenuItem>

{/* THIS IS THE SETTINGS BUTTON THAT REDIRECTS THE ACTIVITYCONTAINER TO SETTINGS COMPONENT */}
        <MenuItem onClick={handleAdminSettings}>Account Settings</MenuItem>

        <MenuGroup>
          <MenuItem>
            {/*  THIS WILL BE THE GROUP NAME */}
            {user.familyName}
          </MenuItem>


        {students.map(s=> {
          return(
          <MenuItem as={Box} key={s.id}> 
{/* MAP FOR ALL STUDENTS OF FAMILY ID */}
           <Avatar size="sm" src={s.profile_picture} alt="user avatar" />
            {s.name}
            <Button onClick={manageStudent} >Manage</Button>
          </MenuItem>)})}

{/* THIS IS THE BUTTON TO ADD ANOTHER CHILD TO THE FAMILY LIST */}
          <MenuItem as={Box} onClick={handleAddStudent}>
           + Add A New Student
          </MenuItem>
        </MenuGroup>

{/* THIS IS THE LOG OUT BUTTON */}
        <MenuItem as={Box}>
          <Button onClick={handleLogout} rightIcon='arrow-forward'>Log Out</Button>
        </MenuItem>
        
      </MenuList>

    </Menu>
  )} else {
    return(
      // Student dropdown
      <Menu>
        <MenuButton as={Button} bg="lightblue" color="black">
        <Avatar size="sm" src={user.profile_picture} alt="user avatar" />
       </MenuButton>
        <MenuList>
        <MenuItem as={Box}>
          <Button onClick={handleLogout} rightIcon='arrow-forward'>Log Out</Button>
        </MenuItem>
        </MenuList>
      </Menu>
    )
  }
};


export default NavMenu;
