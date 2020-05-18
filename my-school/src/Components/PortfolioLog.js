import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityCard from './ActivityCard';

const PortfolioLog = () => {

    // get portfolio data -- select correct portfolio based on user(student) or click(parent)
    const [activities, setActivities] = useState([]);
    // const [query, setQuery] = useState('');
    
      useEffect(() => {
      //get array of entries
        axios.get('https://my-school-v1.herokuapp.com/api/users/{id}/activities')
    
      // .then(response => console.log(response))
    
              .then(response => {
                
                // .filter
                // (entry=>
                // entry.toLowerCase().includes(query.toLowerCase())
                // );
                setActivities(response);
              })
              .catch(error => console.log('whoops', error))
              
      }, []);
      // } , [query];
    
    
    //   const handleChanges = event => {
    //     setQuery(event.target.value )
    //   }
function showActivity(){
    if(activities.length >= 1){
      activities.map(activity => 
      <ActivityCard key={activity.id} activitiy={activity}/>);
    } else {
      return("This Portfolio Is Empty :/");
    }};


    return(
        <div className='portfolio-list'>
        {/* NO ENTRIES BY DEFAULT */}
        {showActivity()}
        </div>
    )

};

export default PortfolioLog;