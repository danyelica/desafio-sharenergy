import { Alert } from "@mui/material";
import { useClient } from "../contexts/ClientsContexts";

export default function SuccessBox() {
  const { successMessage, setSuccessMessage } = useClient();
  return (
    <div className='alertBox'>
      <Alert
        severity='success'
        sx={{
          fontSize: "1.5rem",
        }}
        onClose={() => setSuccessMessage("")}
      >
        {successMessage}
      </Alert>
    </div>
  );
}
