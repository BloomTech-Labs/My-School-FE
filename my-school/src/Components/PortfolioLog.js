import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityCard from './ActivityCard';

const PortfolioLog = () => {

    // get portfolio data -- select correct portfolio based on user(student) or click(parent)
    const [activities, setActivities] = useState([]);
    // const [query, setQuery] = useState('');
    
      useEffect(() => {
      //get array of entries
        axios.get('https://my-school-v1.herokuapp.com/api/users/3/activities')
    
      // .then(response => console.log(response))
    
              .then(response => {
                console.log(response.data)
                // .filter
                // (entry=>
                // entry.toLowerCase().includes(query.toLowerCase())
                // );
                setActivities(response.data);
              })
              .catch(error => console.log('whoops', error))
              
      }, []);
      // } , [query];
    
    
    //   const handleChanges = event => {
    //     setQuery(event.target.value )
    //   }

    
// function showActivity(){
//     if(activities.length >= 1){
//       activities.map(activity => {
//       return(<ActivityCard key={activity.id} activitiy={activity}/>)});
//     } else {
//       return(<p>"This Portfolio Is Empty :/"</p>);
//     }};


    return(
        <div className='portfolio-list'>
        {/* NO ENTRIES BY DEFAULT */}
        {activities.map(activity => {
          return(<ActivityCard key={activity.id} activitiy={activity}/>)
        })}
        </div>
    )

};

export default PortfolioLog;