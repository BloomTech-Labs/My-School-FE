import React, { useEffect, useState } from  'react';
import axios from 'axios';


export default function TopNav() {

  const [ user, setUser ] = useState({});

  useEffect(() => {
    axios.get('https://my-school-v1.herokuapp.com/api/users/{id}') 
    // needs dynamic id from current user)
    .then(response =>{
      setUser(response)
    })
  }, []);


    return (
      <nav className="top-nav">
          {/* logo link to landing page or login? */}
          <a href="http://www.myschoolathome.io"><img url="..\mySchoolLogo.svg" className='logo' /></a>

          {/* Image linked to current user account https://my-school-v1.herokuapp.com/api/users/{user.id}/ */}
          <img src={user.profile_picture} alt="user avatar" className='user-avatar'/>

          {/* Name linked to current user account https://my-school-v1.herokuapp.com/api/users/{user.id}/*/}
          <span alt="user name" className='user-name'>{user}</span>

          {/* Gear icon for parent users -- route body to account settings */}

      </nav>
    );
  }