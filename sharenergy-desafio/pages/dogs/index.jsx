import { Button } from "@mui/material/";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import ErrorBox from "../../components/ErrorBox";
import Header from "../../components/Header";
import styles from "../../styles/Dogs.module.css";
import { checkingToken } from "../../utils/requests";

export default function Dogs() {
  const router = useRouter();
  const user = useLocalStorage("user");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    checkingUser();
    loadDog();
  }, []);

  async function checkingUser() {
    const response = await checkingToken(user[0]);

    if (response === false) return router.push("/");
    return;
  }

  async function loadDog() {
    try {
      const response = await fetch(
        `https://random.dog/woof.json?filter=mp4,webm`
      );
      const data = await response.json();
      setUrl(data.url);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Head>
        <title>Dogs Page</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <header>
        <Header />
      </header>
      <main className='main'>
        <img src={url} className={styles.image} />
        <Button
          variant='contained'
          sx={{
            backgroundColor: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#cf2951",
              boxShadow: "none",
            },
          }}
          onClick={() => loadDog()}
        >
          Nova foto
        </Button>
        <Button
          variant='contained'
          sx={{
            backgroundColor: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#cf2951",
              boxShadow: "none",
            },
          }}
          onClick={() => router.push("/clients")}
        >
          Página Clientes
        </Button>
        {error && <ErrorBox message={error} setError={setError} />}
      </main>
    </>
  );
}
