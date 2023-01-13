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
    endereco: "",
  });
  const [clients, setClients] = useState([]);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        clients,
        setClients,
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
