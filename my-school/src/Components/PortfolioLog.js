import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import {
  getAllActivitiesForUser
} from '../actions/actions-portfolio.js';
import ActivityCard from './ActivityCard';
import '../App.css';

const PortfolioLog = (props) => {
  // const { id } = useParams;
      useEffect(() => {
        //the paramter passed in will not be hard coded once we make user login and dynamic routes
        props.getAllActivitiesForUser(3)       
      }, []);

    return(
        <div className='portfolio-list'>
          {props.activities.map(activity =>(<ActivityCard key={activity.id} activity={activity} className='card' />))}
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
