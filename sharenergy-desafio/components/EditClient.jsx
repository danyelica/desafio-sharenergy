import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useClient } from "../contexts/ClientsContexts";
import { useUser } from "../contexts/UserContext";
import { Input, inputStyles } from "../styles/styledcomponents";
import {
  formatatingNumber,
  maskCep,
  maskCpf,
  maskTel,
} from "../utils/functions";
import { updateClient } from "../utils/requests";
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

export default function EditClient({ setOpen }) {
  const { client, clients, setClients } = useClient();
  const { headers } = useUser();
  const { setSuccessMessage, errorMessage, setErrorMessage } = useClient();
  const [form, setForm] = useState(client);

  useEffect(() => {
    console.log(form);
  }, [form]);

  function handleEditForm(target) {
    setForm({ ...form, [target.id]: target.value });
  }

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

    try {
      const body = {
        ...form,
        telefone: formatatingNumber(form.telefone),
        cpf: formatatingNumber(form.cpf),
        cep: formatatingNumber(form.cep),
      };

      await updateClient(client._id, headers, body);

      const localClients = clients;
      const index = localClients.findIndex(
        (thisClient) => thisClient._id === client._id
      );
      localClients[index] = { ...body };

      setClients(localClients);
      setOpen({ ...open, edit: false });
      return setSuccessMessage("Cliente atualizado com sucesso!");
    } catch (err) {
      if (err.response.data && err.response.data.message)
        return setErrorMessage(err.response.data.message);
    }
  }

  return (
    <Box sx={style}>
      <Input
        id='nome'
        label='Nome'
        variant='outlined'
        value={form.nome || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='email'
        label='E-mail'
        variant='outlined'
        value={form.email || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='cpf'
        label='CPF'
        variant='outlined'
        value={maskCpf(form.cpf) || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='telefone'
        label='Telefone'
        variant='outlined'
        value={maskTel(form.telefone) || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='cep'
        label='CEP'
        variant='outlined'
        value={maskCep(form.cep) || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='rua'
        label='Rua'
        variant='outlined'
        value={form.logradouro || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='bairro'
        label='Bairro'
        variant='outlined'
        value={form.bairro || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='complemento'
        label='Complemento'
        variant='outlined'
        value={form.complemento || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='cidade'
        label='Cidade'
        variant='outlined'
        value={form.cidade || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='estado'
        label='Estado'
        variant='outlined'
        value={form.estado || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
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
        Editar
      </Button>
      {errorMessage && <ErrorBox />}
    </Box>
  );
}
