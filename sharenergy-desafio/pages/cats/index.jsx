import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import styles from "../../styles/Users.module.css";

export default function Users() {
  const router = useRouter();
  const user = useLocalStorage("user");

  useEffect(() => {
    if (!user) {
      return router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={styles.main}>
        <p>oi</p>
      </main>
    </>
  );
}
