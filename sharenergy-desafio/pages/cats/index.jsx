import Head from "next/head";
import { MenuItem, Select } from "@mui/material/";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Button } from "@mui/material/";
import NotFoundPage from "../../public/assets/images/404-page-not-found.png";
import { statusArray, statusCatApi } from "../../services/statuscode";
import styles from "../../styles/Cats.module.css";
import { checkingToken } from "../../utils/requests";
import Header from "../../components/Header";

export default function Cats() {
  const router = useRouter();
  const user = useLocalStorage("user");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    checkingUser();
  }, []);

  async function checkingUser() {
    const response = await checkingToken(user[0]);

    if (response === false) return router.push("/");
    return;
  }

  return (
    <>
      <Head>
        <title>Cats Page</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <header>
        <Header />
      </header>
      <main className='main'>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value=''
          onChange={(event) => {
            const status = Number(event.target.value);
            if (!statusCatApi.includes(status))
              return setSelected(NotFoundPage.src);
            return setSelected(`https://http.cat/${status}.jpg`);
          }}
        >
          {statusArray.map((status) => (
            <MenuItem value={status.status}>{status.status}</MenuItem>
          ))}
        </Select>
        <img src={selected} className={styles.image} />
        <Button
          variant='contained'
          sx={{
            backgroundColor: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#cf2951",
              boxShadow: "none",
            },
          }}
          onClick={() => router.push("/dogs")}
        >
          Dogs
        </Button>
      </main>
    </>
  );
}
