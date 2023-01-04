import api from "../services/api";

async function login(body) {
  const response = await api.post("/login", body);

  return response;
}

export default login;
