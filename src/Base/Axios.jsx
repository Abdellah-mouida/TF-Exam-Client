import axios from "axios";

export let Axios = axios.create({
  baseURL: "http://localhost:5000",
});
