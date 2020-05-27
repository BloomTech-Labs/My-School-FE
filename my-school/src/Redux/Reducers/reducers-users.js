import {
    FETCHING_USERS,
    ADDING_USERS,
    USERS_SUCCESS,
    USERS_FAILURE,
} from '../../actions/actions-users.js';

const initialState= {
    users: [],
    singleUser: [],
    isLoading: false,
    err: ''
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCHING_USERS:
        return {
          ...state,
          isLoading: true,
        };
    case ADDING_USERS:
        return {
            ...state,
            isLoading: true,
        };
case USERS_SUCCESS:
    return {
        ...state,
        isLoading: false,
        activities: action.payload,
        error: "",
    };
    case USERS_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
    default:
        return state;
    }
  };