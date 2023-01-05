import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material/";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import styles from "../../styles/Users.module.css";

export default function Users() {
  const router = useRouter();
  const user = useLocalStorage("user");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) {
      return router.push("/");
    }
    loadUsers();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [page]);

  async function loadUsers() {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
      );
      const data = await response.json();
      return setUsers(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePagination(orientation) {
    if (page === 1 && orientation === "back") return;

    if (orientation === "back") {
      return setPage(page - 1);
    } else if (orientation === "forward") {
      return setPage(page + 1);
    }
  }

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={styles.main}>
        <div className={styles.cardsSection}>
          {users.map((user, index) => (
            <Card sx={{ width: 140, height: 270 }} key={index}>
              <CardMedia
                component='img'
                height='150'
                image={user.picture.large}
                alt={user.gender}
              />
              <CardContent sx={{ wordBreak: "break-word" }}>
                <Typography gutterBottom variant='h5' component='div'>
                  {user.name.first + " " + user.name.last + ", " + user.dob.age}
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                  {user.login.username}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className={styles.column}>
          <Button
            variant='contained'
            sx={{
              backgroundColor: "var(--main-color)",
              "&:hover": {
                backgroundColor: "#cf2951",
                boxShadow: "none",
              },
            }}
            onClick={() => router.push("/cats")}
          >
            HTTP Cat
          </Button>
          <div>
            <ArrowBackIosNewRoundedIcon
              fontSize='large'
              sx={{ cursor: "pointer" }}
              onClick={() => handlePagination("back")}
            />
            <ArrowForwardIosRoundedIcon
              fontSize='large'
              sx={{ cursor: "pointer" }}
              onClick={() => handlePagination("forward")}
            />
          </div>
        </div>
      </main>
    </>
  );
}
