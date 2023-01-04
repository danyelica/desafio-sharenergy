import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";
import styles from "../styles/Home.module.css";
import login from "../utils/requests";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--main-color)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--main-color)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--main-color)",
    },
  },
});

const inputStyles = {
  fontSize: "1.5rem",
};

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [inputError, setInputError] = useState({
    username: null,
    password: null,
  });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser, remove] = useLocalStorage("user", null);

  function handleForm(target) {
    setForm({ ...form, [target.id]: target.value });
  }

  async function handleSubmit() {
    if (!form.username) {
      return setInputError({
        username: "O campo usuário é obrigatório",
      });
    }
    if (!form.password) {
      return setInputError({
        password: "O campo da senha é obrigatório",
      });
    }

    try {
      const { data } = await login(form);

      if (remember) {
        setUser({ ...data, ...form });
        return router.push("/users");
      }

      setUser({ ...data });
      return router.push("/users");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.mensage);
      }
    }
  }
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={styles.main}>
        <Box
          component='form'
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          noValidate
          autoComplete='off'
        >
          <CssTextField
            id='username'
            label='username'
            variant='outlined'
            error={inputError.username}
            inputProps={{
              style: inputStyles,
            }}
            onChange={(event) => handleForm(event.target)}
          />
          <div>
            <CssTextField
              id='password'
              type='password'
              label='password'
              variant='outlined'
              error={inputError.password}
              inputProps={{
                style: inputStyles,
              }}
              onChange={(event) => handleForm(event.target)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    "&.Mui-checked": {
                      color: "var(--main-color)",
                    },
                  }}
                />
              }
              label='remember me'
              sx={{
                marginLeft: "10px",
              }}
              onClick={() => setRemember(!remember)}
            />
          </div>
          <Button
            variant='contained'
            sx={{
              backgroundColor: "#ef476f",
              "&:hover": {
                backgroundColor: "#cf2951",
                boxShadow: "none",
              },
            }}
            onClick={() => handleSubmit()}
          >
            Entrar
          </Button>
        </Box>

        <div className={styles.alertBox}>
          {(inputError.username || inputError.password) && (
            <Alert
              severity='error'
              sx={{
                fontSize: "1.5rem",
              }}
            >
              {inputError.username ? inputError.username : inputError.password}
            </Alert>
          )}
          {error && (
            <Alert
              severity='error'
              sx={{
                fontSize: "1.5rem",
              }}
            >
              {error}
            </Alert>
          )}
        </div>
      </main>
    </>
  );
}
