import axios from "axios";

export function postSignIn(body){
    return axios.post("http://localhost:5000/sign-in", body);
}