import axios from "axios";

const instance = axios.create({
  baseURL: "https://tinder-web-app-backend.herokuapp.com/",
});
export default instance;
