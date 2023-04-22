import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function WarningSnackBar(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if (props.triggerOpen) {
      setOpen(true);
    }
  }, [props.triggerOpen]);

  const message =
    props.number === 1
      ? `Jūs turite ${props.number} produktą, kurio galiojimo laikas artėja prie pabaigos.`
      : `Jūs turite ${props.number} produktus, kurių galiojimo laikas artėja prie pabaigos.`;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        style={{ marginTop: "70px" }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
