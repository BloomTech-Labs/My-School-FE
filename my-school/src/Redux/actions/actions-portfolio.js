import { axiosWithAuth } from './../../utils/axiosWithAuth';

export const FETCHING_ACTIVITIES = 'FETCHING_ACTIVITIES';
export const ACTIVITIES_SUCCESS = 'ACTIVITES_SUCCESS';
export const ACTIVITIES_FAILURE = 'ACTIVITES_FAILURE';
export const ADDING_ACTIVITY = 'ADDING_ACTIVITY';
export const DELETING_ACTIVITY = 'DELETING_ACTIVITY';


export const getAllActivitiesForUser = (id) => dispatch => {
    dispatch({ type: FETCHING_ACTIVITIES })
    axiosWithAuth()
        .get(`https://my-school-v1.herokuapp.com/api/users/${id}/activities`)
        .then(res => {
            setTimeout(() => {
                dispatch({ type: ACTIVITIES_SUCCESS, payload: res.data })
            }, 1000)
        })
        .catch(err => {
            dispatch({ type: ACTIVITIES_FAILURE, payload: err })
        })
}

export const editActivityWithoutPhoto = (id, changes, userId) => {
    return dispatch => {
        dispatch({ type: ADDING_ACTIVITY })
        axiosWithAuth()
            .put(`https://my-school-v1.herokuapp.com/api/activities/${id}`, changes)
            .then(res => {
                dispatch({ type: FETCHING_ACTIVITIES })
                axiosWithAuth()
                    .get(`https://my-school-v1.herokuapp.com/api/users/${userId}/activities`)
                    .then(res => {
                        setTimeout(() => {
                            dispatch({ type: ACTIVITIES_SUCCESS, payload: res.data })
                        }, 1000)
                    })
                    .catch(err => {
                        dispatch({ type: ACTIVITIES_FAILURE, payload: err })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const editActivity = (id, formData, userId) => {
    return dispatch => {
        dispatch({ type: ADDING_ACTIVITY })
        axiosWithAuth()
        .put(`https://my-school-v1.herokuapp.com/api/activities/${id}/addimg`, formData)
            .then(res => {
                dispatch({ type: FETCHING_ACTIVITIES })
                axiosWithAuth()
                    .get(`https://my-school-v1.herokuapp.com/api/users/${userId}/activities`)
                    .then(res => {
                        setTimeout(() => {
                            dispatch({ type: ACTIVITIES_SUCCESS, payload: res.data })
                        }, 1000)
                    })
                    .catch(err => {
                        dispatch({ type: ACTIVITIES_FAILURE, payload: err })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const deleteActivity = (id, user_id) => {
    return dispatch => {
        dispatch({ type: DELETING_ACTIVITY })
        axiosWithAuth()
            .delete(`https://my-school-v1.herokuapp.com/api/activities/${id}`)
            .then(res => {
                dispatch({ type: FETCHING_ACTIVITIES })
                axiosWithAuth()
                    .get(`https://my-school-v1.herokuapp.com/api/users/${user_id}/activities`)
                    .then(res => {
                        setTimeout(() => {
                            dispatch({ type: ACTIVITIES_SUCCESS, payload: res.data })
                        }, 1000)
                    })
                    .catch(err => {
                        dispatch({ type: ACTIVITIES_FAILURE, payload: err })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

