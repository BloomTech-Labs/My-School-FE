import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading } from '@chakra-ui/core';
import axios from 'axios';


const PortfolioHeader = () => {

    const [ title, setTitle ] = useState('');

    useEffect(() => {
        axios.get("https://my-school-v1.herokuapp.com/api/users/3")
        .then(response => {
            
            console.log(response);

            if(response.user_type_id === 1){
                setTitle([response.name]+"'s Portfolio")
            } else {
                setTitle("My Portfolio")
            };
        })
        .catch(error => {
           console.log(error) })
    }, []);
    
    return(
         
        
      
        <header>
            {/* TITLE  -- based on user type and name*/}
            <Link to = '/portfolio'><Heading as="h2">{title}</Heading></Link>

            {/* ADD ACTIVITY BUTTON */}
            <Link to ='/add'><Button lefticon="small-add" variantColor="teal" variant="solid">Add Activity</Button></Link>

            {/*  EXPORT BUTTON -- PARENTS ONLY? */}
            {/* <Button lefticon="download" variantColor="teal" variant="solid">Convert to PDF</Button> */}
           
            {/*SEARCH BOX AND SORT/FILTER FEATUREs WILL GO HERE*/}
            {/* future -- activity tracker? */}
        </header> 
      
    )
}

export default PortfolioHeader;