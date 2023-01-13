import { ClientProvider } from "../contexts/ClientsContexts";
import { UserProvider } from "../contexts/UserContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ClientProvider>
        <Component {...pageProps} />;
      </ClientProvider>
    </UserProvider>
  );
}
