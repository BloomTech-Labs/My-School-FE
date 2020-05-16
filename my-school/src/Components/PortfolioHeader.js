import React, { useState, useEffect } from 'react';
import AddActivityForm from '../Components/AddActivityForm';
import axios from 'axios';


const PortfolioHeader = () => {

    const [ user, setUser ] = useState('');

    useEffect(() => {
        axios.get("https://my-school-v1.herokuapp.com/api")
        .then(response => {
            console.log(response);
            setUser(response.data)})
        .catch(error => {
           console.log(error) })
    }, []);
    
    function redirect(){
        //change Container to Form
    }
    
    return(
        <header>
            {/* TITLE */}
            <h2></h2>
            {/* ADD BUTTON */}
            <button onClick={redirect}>+ Add Activity</button>
             {/*SEARCH BOX AND SORT/FILTER FEATURE GO HERE*/}
        </header> 
    )
}

export default PortfolioHeader;