import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllChildrenForFamily, addNewChild, deleteChild } from '../actions/actions-users';
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
        getAllChildrenForFamily({fam_id})   
        setChildren([res.data]) 
      }, [getAllChildenForFamily]);
      
    return(
        <div className='child-list'>
          {isLoading === true ? <Loader color={'#329795'} css={override}/> : 
          (children.map(child =>(<ChildCard key={child.id} child={child} className='card' />)))}
        </div>
    )
};

const mapStateToProps = (state) => {
  return {
    activities: state.usersReducer.activities,
    isLoading: state.usersReducer.isLoading,
    error: state.usersReducer.error,
  };
};

export default connect(mapStateToProps , { getAllActivitiesForUser })(PortfolioLog);
