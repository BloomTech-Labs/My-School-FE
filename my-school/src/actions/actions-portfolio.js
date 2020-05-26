import axios from 'axios';
export const FETCHING_ACTIVITES = 'FETCHING_ACTIVITIES';
export const ACTIVITES_SUCCESS =  'ACTIVITES_SUCCESS';
export const ACTIVITES_FAILURE = 'ACTIVITES_FAILURE';

export const getAllActivitiesForUser = (id) => {
    return dispatch => {
        dispatch({type: FETCHING_ACTIVITES})
        axios.get(`https://my-school-v1.herokuapp.com/api/users/${id}/activities`)
        .then(res => {
            setTimeout(()=> {
                dispatch({type: ACTIVITES_SUCCESS, payload: res.data})
            }, 1000)
        })
        .catch(err => {
            console.log(err)
            dispatch({type: ACTIVITES_FAILURE, payload: err})
        })
    }
}

export const editActivityWithoutPhoto  = (id, changes, userId) => {
    return dispatch => {
        axios.put(`https://my-school-v1.herokuapp.com/api/activities/${id}`, changes)
        .then(res => {
            dispatch({type: FETCHING_ACTIVITES})
            axios.get(`https://my-school-v1.herokuapp.com/api/users/${userId}/activities`)
            .then(res => {
                setTimeout(()=> {
                    dispatch({type: ACTIVITES_SUCCESS, payload: res.data})
                }, 1000)
            })
            .catch(err => {
                dispatch({type: ACTIVITES_FAILURE, payload: err})
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const editActivity = (id, formData, userId) => {
    return dispatch => {
        axios.put(`https://my-school-v1.herokuapp.com/api/activities/${id}/addimg`, formData)
        .then(res => {
            dispatch({type: FETCHING_ACTIVITES})
            axios.get(`https://my-school-v1.herokuapp.com/api/users/${userId}/activities`)
            .then(res => {
                setTimeout(()=> {
                    dispatch({type: ACTIVITES_SUCCESS, payload: res.data})
                }, 1000)
            })
            .catch(err => {
                dispatch({type: ACTIVITES_FAILURE, payload: err})
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const deleteActivity = (id, user_id) => {
    return dispatch => {
        axios.delete(`https://my-school-v1.herokuapp.com/api/activities/${id}`)
        .then(res => {
            dispatch({type: FETCHING_ACTIVITES})
            axios.get(`https://my-school-v1.herokuapp.com/api/users/${user_id}/activities`)
            .then(res => {
                setTimeout(()=> {
                    dispatch({type: ACTIVITES_SUCCESS, payload: res.data})
                }, 1000)
            })
            .catch(err => {
                dispatch({type: ACTIVITES_FAILURE, payload: err})
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

