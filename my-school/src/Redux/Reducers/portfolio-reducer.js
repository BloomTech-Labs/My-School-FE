import {
    FETCHING_ACTIVITIES,
    ACTIVITIES_SUCCESS,
    ACTIVITIES_FAILURE,
    DELETING_ACTIVITY,
    ADDING_ACTIVITY
} from '../../actions/actions-portfolio.js';

const initialState= {
    activities: [],
    isLoading: false,
    err: ''
}

export const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_ACTIVITIES:
        return {
          ...state,
          isLoading: true,
        };
      case ACTIVITIES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          activities: action.payload,
          err: "",
        };
      case ACTIVITIES_FAILURE:
        return {
          ...state,
          isLoading: false,
          err: action.payload,
        };
      case DELETING_ACTIVITY:
          return {
            ...state,
            isLoading: true,
          };
      case ADDIING_ACTIVITY:
            return {
              ...state,
              isLoading: true,
            };
      default:
        return state;
    }
  };
