import axios from "axios";

export const api = axios.create({
  baseURL: "https://cdn-api.co-vin.in/api",
});
