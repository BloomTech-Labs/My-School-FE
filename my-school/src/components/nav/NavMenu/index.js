import React from 'react'
import {useHistory} from 'react-router-dom'
import {Menu, MenuItem, MenuDivider, MenuGroup, MenuList, Text} from '@chakra-ui/core'
import capitalizeName from '../../../utils/capitalizeName'
import {logout} from '../../../redux/actions/user-actions'
import {connect} from 'react-redux'
//Component Imports
import MenuButton from './MenuButton'
import AccountInfo from './AccountInfo'
import Students from './Students'
import AddStudent from './AddStudent'
import SignOut from './SignOut'

const NavMenu = ({user, family, logout}) => {
  const history = useHistory();

  const handleSettings = id => {
    history.push(`/settings/${id}`)
  }

     return(
        <Menu>
          <MenuButton user={user} />
          <MenuList p="0" mx="24px" w="315px" boxShadow="0px 40px 80px rgba(0, 0, 0, 0.12)">
          <AccountInfo user={user} />
          {user.user_type_id === 1 && <MenuItem fontSize="sm" color="gray.700" px="24px" mt="12px" py="12px" onClick={()=> {handleSettings(user.id)}}>Account Settings</MenuItem>}
          <MenuDivider color="gray.300" m="0" />
          {/* LIST OF STUDENT ACCOUNTS IF PARENT ACCOUNT */}
          {user.user_type_id === 1 &&
            <>
              <MenuGroup title={`${user.familyName && capitalizeName(user.familyName)} Family`} fontSize="1.125" color="gray.800" fontWeight="bold" mx="24px" mt="20px" mb="12px" p="0">
                {/* EXISTING STUDENT ACCOUNTS */}
                {family.length > 1 ?
                  family.map(s => {
                    // family includes parent, so much filter for student accts only
                    if (s.user_type_id === 2 && localStorage.getItem('userId') !== s.id) {
                      return (
                        <Students handleSettings={handleSettings} s={s} key={s.id}/>
                      )
                    } else {
                      return null
                    }
                  })
                  : 
                  <Text fontSize="sm" color="gray.700" py="8px" my="12px" px="24px">No students have been added to your family yet</Text>
                  }
                  <AddStudent/>
              </MenuGroup>
            </>
          }
          {/* SIGN OUT */}
          <SignOut logout={logout}/>
        </MenuList>
      </Menu>
     )
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    family: state.usersReducer.family,
    err: state.usersReducer.error
  }
}

export default connect(mapStateToProps, { logout })(NavMenu);

