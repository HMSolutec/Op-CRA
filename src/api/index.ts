import axios from "axios";

const api = axios.create({
  // Mock URL
  baseURL: "https://jsonplaceholder.typicode.com/"
})


export default api;
