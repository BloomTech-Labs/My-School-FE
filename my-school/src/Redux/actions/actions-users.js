import axios from "axios";

export const FETCH_USER = "FETCH_USER";
export const SET_USER = "SET_USER";
export const SET_ERROR = "SET_ERROR";
export const FETCH_FAMILY = "FETCH_FAMILY";
export const SET_FAMILY = "SET_FAMILY";
export const DELETE_USER = "DELETE_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_USER_ON_LOGIN = "SET_USER_ON_LOGIN";
export const SET_REGISTRATION = "SET_REGISTRATION";
export const UPDATING_USER = 'UPDATING_USER';
export const UPDATING_USER_SUCCESS = 'UPDATING_USER_SUCCESS';
export const UPDATING_USER_ADMIN = 'UPDATING_USER_ADMIN';
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';


export const getUserByID = (id) => (dispatch) => {
  dispatch({ type: FETCH_USER });
  return axios
    .get(`https://my-school-v1.herokuapp.com/api/users/${id}`)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
      return res;
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err });
    });
};

export const getFamilyName = (id) => (dispatch) => {
  dispatch({ type: FETCH_FAMILY });
  axios
    .get(`https://my-school-v1.herokuapp.com/api/families/${id}`)
    .then((res) => {
      dispatch({ type: SET_FAMILY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err });
    });
};

export const deletEntireFamily = familyId => dispatch => {
  dispatch({ type: DELETE_USER })
  return axios
    .delete(`https://my-school-v1.herokuapp.com/api/families/${familyId}`)
    .then(res => {
      dispatch({ type: CLEAR_USER })
      console.log('the family was delete')
      return res
    })
    .catch(err => dispatch({ type: SET_ERROR, payload: err })
    )
}

export const deleteAccount = (id, user) => dispatch => {
  dispatch({ type: DELETE_USER });
  return axios
    .delete(`https://my-school-v1.herokuapp.com/api/users/${id}`)
    .then(res => {
      dispatch({ type: DELETE_STUDENT_SUCCESS, payload: user })
      return res
    })
    .catch(err => dispatch({ type: SET_ERROR, payload: err }))
}

export const login = (user) => (dispatch) => {
  dispatch({ type: FETCH_USER });
  return axios
    .post("https://my-school-v1.herokuapp.com/api/auth/login", user)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_id", res.data.user.id);
      dispatch({ type: SET_USER_ON_LOGIN, payload: res.data });
      return res;
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err });
    });
};

export const getFamily = (familyId) => (dispatch) => {
  dispatch({ type: FETCH_FAMILY });
  axios
    .get(`https://my-school-v1.herokuapp.com/api/families/${familyId}`)
    .then((res) => {
      dispatch({ type: SET_FAMILY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};

export const register = (family, user, userTypeID) => (dispatch) => {
  dispatch({ type: SET_REGISTRATION });
  axios
    .post("https://my-school-v1.herokuapp.com/api/families", family)
    .then((res) => {
      const familyID = res.data.id;
      const newUser = {
        username: user.email || user.username,
        email: user.email || null,
        password: user.password,
        family_id: familyID,
        name: user.firstname || null,
        user_type_id: userTypeID,
      };
      axios
        .post(
          "https://my-school-v1.herokuapp.com/api/auth/registration",
          newUser
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user.id);
          dispatch({ type: SET_USER_ON_LOGIN, payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: SET_ERROR, payload: err });
        });
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err });
    });
};

export const createStudent = (familyID, user, userTypeID) => (dispatch) => {
  dispatch({ type: SET_REGISTRATION });
  const newUser = {
    username: user.username,
    password: user.password,
    family_id: familyID,
    name: user.firstname,
    user_type_id: 2,
  };
  axios
    .post("https://my-school-v1.herokuapp.com/api/auth/registration", newUser)
    .then((res) => {
      axios
        .get(`https://my-school-v1.herokuapp.com/api/families/${familyID}`)
        .then((res) => {
          dispatch({ type: SET_FAMILY, payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: SET_ERROR, payload: err });
        });
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR });
    });
};

export const editProfileWithoutImage = (data, id) => dispatch => {
  dispatch({ type: UPDATING_USER })
  return axios
    .put(`https://my-school-v1.herokuapp.com/api/users/${id}`, data)
    .then(res => {
      if (res.data.user_type_id === 1) {
        dispatch({ type: UPDATING_USER_SUCCESS, payload: res.data })
        dispatch({ type: UPDATING_USER_ADMIN, payload: res.data })
        return res
      } else {
        dispatch({ type: UPDATING_USER_SUCCESS, payload: res.data })
      }
    })
    .catch(err => {
      dispatch({ type: SET_ERROR, payload: err })
      console.log(err)
    })
}

export const editProfileWithImage = (data, id) => dispatch => {
  dispatch({ type: UPDATING_USER })
  return axios
    .put(`https://my-school-v1.herokuapp.com/api/users/${id}/profilepic`, data)
    .then(res => {
      if (res.data.user_type_id === 1) {
        dispatch({ type: UPDATING_USER_SUCCESS, payload: res.data })
        dispatch({ type: UPDATING_USER_ADMIN, payload: res.data })
        return res
      } else {
        dispatch({ type: UPDATING_USER_SUCCESS, payload: res.data })
      }
    })
    .catch(err => {
      dispatch({ type: SET_ERROR, payload: err })
      console.log(err)
    })
}
