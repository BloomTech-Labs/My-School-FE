import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getAllChildrenForUser
} from '../actions/actions-portfolio.js';
import ChildCard from './ChildCard';
import '../App.css';
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";

const PortfolioLog = ({children, getAllChildrenForFamily, isLoading}) => {
      const [children, setChildren] = useState([]);
      const override = css`
      margin-top: 10rem;
      `
      
      useEffect( _ => {
        ReactGA.initialize("UA-156199574-5")
        ReactGA.pageview("/dashboard")
      },[])

      useEffect(() => {
        getAllChildrenForUser({id})    
      }, [getAllChldenForUser]);
      
    return(
        <div className='portfolio-list'>
          {isLoading === true ? <Loader color={'#329795'} css={override}/> : 
          (children.map(child =>(<ChildCard key={child.id} child={child} className='card' />)))}
        </div>
    )
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities,
    isLoading: state.portfolioReducer.isLoading,
    error: state.portfolioReducer.error,
  };
};

export default connect(mapStateToProps , { getAllActivitiesForUser })(PortfolioLog);
