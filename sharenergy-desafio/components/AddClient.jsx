import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useClient } from "../contexts/ClientsContexts";
import { useUser } from "../contexts/UserContext";
import { formatatingNumber } from "../utils/functions";
import { registerClient } from "../utils/requests";
import ClientForm from "./ClientForm";
import ErrorBox from "./ErrorBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddClient({ setOpen }) {
  const {
    client,
    form,
    setForm,
    clients,
    setClients,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
  } = useClient();
  const { headers } = useUser();

  useEffect(() => {
    return setForm({
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      logradouro: "",
      bairro: "",
      cep: "",
      estado: "",
    });
  }, []);

  async function handleSubmit() {
    if (
      !form.nome ||
      !form.email ||
      !form.telefone ||
      !form.cpf ||
      !form.cep ||
      !form.logradouro ||
      !form.bairro ||
      !form.cidade ||
      !form.estado
    )
      return setErrorMessage("Preencha todos os campos obrigatórios.");

    if (!form.email.includes("@") || !form.email.includes("."))
      return setErrorMessage("Coloque um email com um formato correto.");

    try {
      const body = {
        ...form,
        telefone: formatatingNumber(form.telefone),
        cpf: formatatingNumber(form.cpf),
        cep: formatatingNumber(form.cep),
      };

      const { data } = await registerClient(headers, body);

      const localClients = clients;
      localClients.push(data);

      setClients(localClients);
      setOpen({ ...open, add: false });
      return setSuccessMessage("Cliente registrado com sucesso!");
    } catch (err) {
      if (err.response.data && err.response.data.message)
        return setErrorMessage(err.response.data.message);
    }
  }

  return (
    <Box sx={style}>
      <ClientForm />
      <Button
        variant='contained'
        sx={{
          marginTop: "20px",
          backgroundColor: "var(--main-color)",
          "&:hover": {
            backgroundColor: "#cf2951",
            boxShadow: "none",
          },
        }}
        onClick={() => handleSubmit()}
      >
        Adicionar
      </Button>
      {errorMessage && <ErrorBox />}
    </Box>
  );
}
