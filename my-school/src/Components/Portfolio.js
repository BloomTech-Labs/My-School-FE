import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioLog from "./PortfolioLog";
import AddActivityForm from "./Forms/AddActivityForm";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./PDFExporter";
import axios from 'axios'

const Portfolio = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('https://my-school-v1.herokuapp.com/api/activities')
        .then(res => {
            console.log(res.data)
            setActivities(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

  return (
    <div>
      <Router>
        <Route>
          <PortfolioHeader />
        </Route>
        <div>
          <Switch>
            <Route path="/portfolio">
              <PortfolioLog />
            </Route>
            <Route path="/add">
              <AddActivityForm />
            </Route>
            <Route path="/doc">
              <PDFViewer>
                <MyDocument activities={activities}/>
              </PDFViewer>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Portfolio;
