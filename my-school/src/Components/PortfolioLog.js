import React from 'react';

const PortfolioLog = () => {

    // get portfolio data -- how to select correct portfolio based on user(student) or click(parent)
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

    return(
        <div className='portfolio-list'>
        {/* NO ENTRIES BY DEFAULT */}
        {data.map((user) => (
        <EntryCard key={user.id} user={user}/>
        ))}
        </div>
    )

};

export default PortfolioLog;