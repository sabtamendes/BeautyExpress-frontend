import axios from "axios";

export function postSignIn(body) {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`, body);
}
export function postSignUp(body) {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, body);
}
export function loggingOut(config) {
  return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/sign-out`,config);
}