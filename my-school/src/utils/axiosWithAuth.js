import axios from "axios";

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem("token")); 
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: "https://my-school-v1.herokuapp.com/",
  });
};