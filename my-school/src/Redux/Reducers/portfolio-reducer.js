import {
    FETCHING_ACTIVITES,
    ACTIVITES_SUCCESS,
    ACTIVITES_FAILURE,
} from '../../actions/actions-portfolio.js';

const initialState= {
    activities: [],
    singleActivity: [],
    isLoading: false,
    err: ''
}

export const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_ACTIVITES:
        return {
          ...state,
          isLoading: true,
        };
      case ACTIVITES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          activities: action.payload,
          error: "",
        };
      case ACTIVITES_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };