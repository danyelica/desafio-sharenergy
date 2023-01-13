import api from "../services/api";

export async function login(body) {
  const response = await api.post("/login", body);
  return response;
}

export async function checkingToken(user) {
  if (!user) return false;
  try {
    await api.post("/users/verify-token", { token: user.token });

    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) return false;
  }
}

export async function listClients(headers) {
  const response = await api.get("/clients", { headers });
  return response;
}

export async function getClient(id, headers) {
  const response = await api.get(`/clients/${id}`, { headers });
  return response;
}

export async function updateClient(id, headers, body) {
  const response = await api.put(`/clients/${id}`, { ...body }, { headers });
  return response;
}
