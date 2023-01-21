import axios from "axios"; //works similar to postman

//create instance which contains base url that will help to give get requests
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
