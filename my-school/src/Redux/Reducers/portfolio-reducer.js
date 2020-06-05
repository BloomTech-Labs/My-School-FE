import {
    FETCHING_ACTIVITIES,
    ACTIVITIES_SUCCESS,
    ACTIVITIES_FAILURE,
    DELETING_ACTIVITY,
    ADDING_ACTIVITY,
    ALL_ACTIVITIES_SUCCESS
} from '../../actions/actions-portfolio.js';

const initialState= {
    activities: [],
    allActivities: [],
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
        case ALL_ACTIVITIES_SUCCESS:
          return {
            ...state,
            isLoading: false,
            allActivities: action.payload,
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
      case ADDING_ACTIVITY:
            return {
              ...state,
              isLoading: true,
            };
      default:
        return state;
    }
  };
