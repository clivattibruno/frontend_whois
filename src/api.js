import axios from "axios";

const api = axios.create({
  baseURL: "https://api.adyl.net.br/api-whois",
});

export default api;
