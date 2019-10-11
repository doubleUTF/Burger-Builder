import axios from "axios";

const instance = axios.create({
  baseURL: "https://recipe-book-77cce.firebaseio.com"
});

export default instance;
