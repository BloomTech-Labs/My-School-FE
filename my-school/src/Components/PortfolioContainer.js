import React, { useState, useEffect, Form } from 'react';
import axios from 'axios';
// import SearchForm from './SearchForm';
import EntryCard from './EntryCard';


export default function EntryList() {

const [data, setData] = useState([]);
// const [query, setQuery] = useState('');

  useEffect(() => {
  //get array of entries
    axios.get('ENDPOINT GOES HERE')

  // .then(response => console.log(response))

          .then(response => {
            const entry = response.data.results
            // .filter
            // (entry=>
            // entry.toLowerCase().includes(query.toLowerCase())
            // );
            setData(entry);
          })
          .catch(error => console.log('whoops', error))
          
  }, [query]);


//   const handleChanges = event => {
//     setQuery(event.target.value )
//   }

  return (
    <div className='container'>   
        <header>
        {/* TITLE AND ADD ACTIVITY BUTTON HERE */}
        {/*SEARCH BOX AND SORT/FILTER FEATURE GO HERE*/}
        </header> 

        <div className='portfolio-list'>
            {/* NO ENTRIES BY DEFAULT */}
        {data.map((user) => (
          <EntryCard key={user.id} user={user}/>
        ))}
      </div>
    // </div>
  );
}
