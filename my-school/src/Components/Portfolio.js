
import React, {useEffect, useState} from "react";
import { Route } from "react-router-dom";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioLog from "./PortfolioLog";
import MyDocument from "./PDFExporter";
import axios from 'axios'
import AddActivityForm from './AddActivity/AddActivityForm';


const Portfolio = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('https://my-school-v1.herokuapp.com/api/activities')
        .then(res => {
            setActivities(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

  return (
    <div>
      <PortfolioHeader />
      <Route path="/portfolio" component={PortfolioLog} />     
      <Route path="/add" render={ props => <AddActivityForm {...props} activities={activities} setActivities={setActivities} />} />
      <Route path="/doc" render={ _ => <MyDocument activities={activities} /> } />
    </div>
  );
};

export default Portfolio;
