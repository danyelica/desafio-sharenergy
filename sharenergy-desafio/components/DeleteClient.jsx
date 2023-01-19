import { Box, Typography } from "@mui/material";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { deleteClient } from "../utils/requests";
import { useClient } from "../contexts/ClientsContexts";
import { useUser } from "../contexts/UserContext";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfirmButton = styled(ButtonUnstyled)(
  ({ success, theme }) => `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border-radius: 15px;
    border: none;
    padding: 5px;
    background: ${
      success ? theme.palette.success.main : theme.palette.error.main
    };
    cursor: pointer;
    color: #ffffff;
    `
);

export default function DeleteClient({ open, setOpen }) {
  const { clients, setClients, setSuccessMessage, setErrorMessage } =
    useClient();
  const { headers } = useUser();

  async function handleDelete() {
    try {
      await deleteClient(open.delete, headers);

      const localClients = clients.filter(
        (thisClient) => thisClient._id !== open.delete
      );

      setClients(localClients);
      setOpen({ ...open, delete: false });
      return setSuccessMessage("Cliente deletado com sucesso!");
    } catch (err) {
      if (err.response.data && err.response.data.message)
        return setErrorMessage(err.response.data.message);
    }
  }
  return (
    <Box sx={style}>
      <Typography id='modal-modal-title' variant='h3' component='h2'>
        Tem certeza que quer deletar esse cliente?
      </Typography>
      <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <ConfirmButton success={true} onClick={() => handleDelete()}>
          <Typography variant='h5'>Sim</Typography>
          <CheckCircleRoundedIcon fontSize='large' color='white' />
        </ConfirmButton>
        <ConfirmButton success={false} onClick={() => setOpen(false)}>
          <Typography variant='h5'>Não</Typography>
          <ClearRoundedIcon fontSize='large' color='white' />
        </ConfirmButton>
      </Box>
    </Box>
  );
}
