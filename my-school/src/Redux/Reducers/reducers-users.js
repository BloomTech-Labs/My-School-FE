import {
    FETCHING_USERS,
    ADDING_USERS,
    USERS_SUCCESS,
    USERS_FAILURE,
} from '../../actions/actions-users.js';

const initialState= {
    users: [],
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
        users: action.payload,
        err: "",
    };
    case USERS_FAILURE:
        return {
          ...state,
          isLoading: false,
          err: action.payload,
        };
    default:
        return state;
    }
  };