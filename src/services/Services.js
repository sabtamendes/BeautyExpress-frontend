import { BASE_URL } from "../constants/urls";

import axios from "axios";

export function postSignIn(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}
export function postSignUp(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}
export function loggingOut(config) {
  return axios.delete(`${BASE_URL}/config`);
}