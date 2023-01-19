import { createContext, useContext, useState } from "react";

const ClientContext = createContext({});

export default ClientContext;

export function ClientProvider(props) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [client, setClient] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    logradouro: "",
    bairro: "",
    cep: "",
    estado: "",
  });
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    logradouro: "",
    bairro: "",
    cep: "",
    estado: "",
  });
  const [clients, setClients] = useState([]);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        clients,
        setClients,
        form,
        setForm,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}
