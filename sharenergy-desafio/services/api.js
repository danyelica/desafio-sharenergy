import axios from "axios";

export default axios.create({
  baseURL: "https://desafio-sharenergy.up.railway.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
