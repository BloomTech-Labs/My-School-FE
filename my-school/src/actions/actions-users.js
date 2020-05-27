import axios from 'axios';
export const FETCHING_USERS = 'FETCHING_USERS';
export const ADDING_USERS = 'ADDING_USERS';
export const USERS_SUCCESS =  'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';


export const getAllChildrenForFamily= (fam_id) => {
    return dispatch => {
        dispatch({type: FETCHING_USERS})
        axios.get(`https://my-school-v1.herokuapp.com/api/families/${fam_id}`)
        .then(res => {
            setTimeout(()=> {
                dispatch({type: USERS_SUCCESS, payload: res.data})
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            dispatch({type: USERS_FAILURE, payload: err})
        })
    }
}

export const addNewChild = (fam_id) => {
    return dispatch => {
        dispatch({type: ADDING_USERS})
        axios.post(`https://my-school-v1.herokuapp.com/api/families/${fam_id}`)
        .then(res => {
            setTimeout(()=> {
                dispatch({type: USERS_SUCCESS, payload: res.data})
            }, 2000)
        })
        .catch(err => {
            console.log(err)
            dispatch({type: USERS_FAILURE, payload: err})
        })
    }
}


export const deleteChild = (fam_id, student_id) => {
    return dispatch => {
        axios.delete(`https://my-school-v1.herokuapp.com/api/users/${student_id}/`)
        .then(res => {
            dispatch({type: FETCHING_USERS})
            axios.get(`https://my-school-v1.herokuapp.com/api/families/${fam_id}`)
            .then(res => {
                setTimeout(()=> {
                    dispatch({type: USERS_SUCCESS, payload: res.data})
                }, 2000)
            })
            .catch(err => {
                dispatch({type: USERS_FAILURE, payload: err})
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}