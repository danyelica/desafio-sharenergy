import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

export default function Header() {
  const router = useRouter();

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => router.push("http://localhost:3000/")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => router.push("http://localhost:3000/users")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Users
            </Button>
            <Button
              onClick={() => router.push("http://localhost:3000/cats")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Cats
            </Button>
            <Button
              onClick={() => router.push("http://localhost:3000/dogs")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dogs
            </Button>
            <Button
              onClick={() => router.push("http://localhost:3000/clients")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Clients
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
