import React, { useState, useEffect } from 'react';
import { Router, Link } from 'react-router-dom';
import AddActivityForm from './Forms/AddActivityForm';
import axios from 'axios';


const PortfolioHeader = () => {

    const [ title, setTitle ] = useState('');

    useEffect(() => {
        axios.get("https://my-school-v1.herokuapp.com/api/users")
        .then(response => {
            
            console.log(response);

            if(response.user_type_id = 1){
                setTitle(response.users.user_name)
            } else {
                setTitle("My Portfolio")
            };
        })
        .catch(error => {
           console.log(error) })
    }, []);
    
    return(
        <Router>
        <header>
            {/* TITLE  -- based on user type and name*/}
            <h2 className='portfolio-title'>{title}</h2>

            {/* ADD ACTIVITY BUTTON */}
            <Link to ='/addactivity'><button>+ Add Activity</button></Link>

            {/*  EXPORT BUTTON -- PARENTS ONLY? */}
            {/* <button>Export to PDF</button> */}
           
            {/*SEARCH BOX AND SORT/FILTER FEATUREs WILL GO HERE*/}
        </header> 
        </Router>
    )
}

export default PortfolioHeader;