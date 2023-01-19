import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteClient from "../../components/DeleteClient";
import DetailClient from "../../components/DetailClient";
import EditClient from "../../components/EditClient";
import ErrorBox from "../../components/ErrorBox";
import SuccessBox from "../../components/SuccessBox";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useClient } from "../../contexts/ClientsContexts";
import { useUser } from "../../contexts/UserContext";
import styles from "../../styles/Clients.module.css";
import { checkingToken, getClient, listClients } from "../../utils/requests";
import AddClient from "../../components/AddClient";
import Header from "../../components/Header";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Clients() {
  const router = useRouter();
  const { user, headers } = useUser();
  const {
    setClient,
    clients,
    setClients,
    successMessage,
    errorMessage,
    setErrorMessage,
  } = useClient();
  const [open, setOpen] = useState({
    add: false,
    detail: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    checkingUser();
    loadClients();
  }, []);

  async function checkingUser() {
    const response = await checkingToken(user);
    if (response === false) return router.push("/");

    return;
  }

  async function loadClients() {
    try {
      const { data } = await listClients(headers);
      return setClients(data);
    } catch (err) {
      if (err.response && err.response.data)
        return setErrorMessage(err.response.data.message);
    }
  }

  async function loadClient(id, action) {
    try {
      const { data } = await getClient(id, headers);
      setClient(data);

      if (action === "edit") return setOpen({ ...open, edit: true });
      return setOpen({ ...open, detail: true });
    } catch (err) {
      if (err.response && err.response.data)
        return setErrorMessage(err.response.data.message);
    }
  }

  return (
    <>
      <Head>
        <title>Clients Page</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <header>
        <Header />
      </header>
      <main className='main'>
        <Button
          variant='contained'
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#cf2951",
              boxShadow: "none",
            },
          }}
          onClick={() => setOpen({ ...open, add: true })}
        >
          Adicionar Cliente
          <AddCircleRoundedIcon />
        </Button>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ width: "400px", height: "80vh", overflowY: "scroll" }}
        >
          <Demo>
            <List dense={true}>
              {clients.map((client) => (
                <ListItem
                  key={client._id}
                  secondaryAction={
                    <div className={styles.icons}>
                      <IconButton edge='end' aria-label='edit'>
                        <EditIcon
                          onClick={() => loadClient(client._id, "edit")}
                        />
                      </IconButton>
                      <IconButton edge='end' aria-label='delete'>
                        <DeleteIcon
                          onClick={() =>
                            setOpen({ ...open, delete: client._id })
                          }
                        />
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemAvatar
                    sx={{ cursor: "pointer" }}
                    onClick={() => loadClient(client._id, "detail")}
                  >
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={client.nome}
                    sx={{ cursor: "pointer" }}
                    onClick={() => loadClient(client._id, "detail")}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
        <Modal
          open={open.add}
          onClose={() => setOpen({ ...open, add: false })}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <AddClient setOpen={setOpen} />
        </Modal>
        <Modal
          open={open.detail}
          onClose={() => setOpen({ ...open, detail: false })}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <DetailClient />
        </Modal>
        <Modal
          open={open.edit}
          onClose={() => setOpen({ ...open, edit: false })}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <EditClient setOpen={setOpen} />
        </Modal>
        <Modal
          open={open.delete}
          onClose={() => setOpen({ ...open, delete: false })}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <DeleteClient open={open} setOpen={setOpen} />
        </Modal>
        {errorMessage && <ErrorBox />}
        {successMessage && <SuccessBox />}
      </main>
    </>
  );
}
