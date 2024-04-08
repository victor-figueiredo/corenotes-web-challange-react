import axios from "axios";
import Cookies from "js-cookie";

const BASEURL = "http://127.0.0.1:8000/api";

const access_token = Cookies.get("token");

const httpClient = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  },
});

export default httpClient;
