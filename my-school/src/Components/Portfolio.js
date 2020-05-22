
import React, {useEffect, useState} from "react";
import { Route } from "react-router-dom";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioLog from "./PortfolioLog";
import MyDocument from "./PDFExporter";
import axios from 'axios'
import AddActivityForm from './AddActivity/AddActivityForm';
import ActivityOverview from './AcitvityOverview'


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
      <Route exact path="/portfolio" component={PortfolioLog} />     
      <Route exact path="/add" render={ props => <AddActivityForm {...props} activities={activities} setActivities={setActivities} />} />
      <Route exact path="/doc" render={ _ => <MyDocument activities={activities} /> } />
      <Route path='/activity/:id' render={props => <ActivityOverview activities={activities}/>}/>
    </div>
  );
};

export default Portfolio;
