import { Alert } from "@mui/material";
import { useClient } from "../contexts/ClientsContexts";

export default function ErrorBox() {
  const { errorMessage, setErrorMessage } = useClient();
  return (
    <div className='alertBox'>
      <Alert
        severity='error'
        sx={{
          fontSize: "1.5rem",
        }}
        onClose={() => setErrorMessage("")}
      >
        {errorMessage}
      </Alert>
    </div>
  );
}
