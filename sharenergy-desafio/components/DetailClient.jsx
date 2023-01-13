import { Box, Typography } from "@mui/material";
import { useClient } from "../contexts/ClientsContexts";
import { maskCep, maskCpf, maskTel } from "../utils/functions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const modalStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "5px",
  mt: 2,
};

export default function DetailClient() {
  const { client } = useClient();

  return (
    <Box sx={style}>
      <Typography id='modal-modal-title' variant='h3' component='h2'>
        {client.nome}
      </Typography>
      <Typography id='modal-modal-description' sx={modalStyles}>
        <Typography variant='h6'>E-mail:</Typography>
        {client.email}
        <Typography variant='h6'>CPF:</Typography>
        {maskCpf(client.cpf)}
        <Typography variant='h6'>Telefone:</Typography>
        {maskTel(client.telefone)}
      </Typography>
      <Typography id='modal-modal-description' sx={modalStyles}>
        <Typography variant='h6'>CEP:</Typography>
        {maskCep(client.cep)}
        <Typography variant='h6'>Cidade:</Typography>
        {client.cidade}
        <Typography variant='h6'>Estado:</Typography>
        {client.estado}
      </Typography>
      <Typography id='modal-modal-description' sx={modalStyles}>
        <Typography variant='h6'>Rua:</Typography>
        {client.logradouro}
        <Typography variant='h6'>Bairro:</Typography>
        {client.bairro}
        {client.complemento && (
          <>
            <Typography variant='h6'>Complemento:</Typography>
            {client.complemento}
          </>
        )}
      </Typography>
    </Box>
  );
}
