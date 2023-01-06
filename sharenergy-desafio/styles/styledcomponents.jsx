import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { TextField } from "@mui/material/";
import { styled } from "@mui/material/styles";

export const Input = styled(TextField)({
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

export const inputStyles = {
  fontSize: "1.5rem",
};

export const InputAdornment = styled("div")`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled(ButtonUnstyled)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: #888888;
  `
);
