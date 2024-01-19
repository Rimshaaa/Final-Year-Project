import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

const useToast = () => {
  const [snack, setSnack] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "success",
    message: "",
  });

  const showSnackbar = (
    message,
    severity = "success",
    vertical = "top",
    horizontal = "center"
  ) => {
    setSnack({
      open: true,
      vertical,
      horizontal,
      severity,
      message,
    });
  };

  const hideSnackbar = () => {
    setSnack((prev) => ({
      ...prev,
      message: "",
      severity: "",
      open: false,
    }));
  };

  const { vertical, horizontal } = snack;

  const SnackbarComponent = (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={snack.open}
      autoHideDuration={2000}
      key={vertical + horizontal}
      onClose={hideSnackbar}
    >
      <Alert severity={snack.severity} sx={{ width: "100%" }}>
        {snack.message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, hideSnackbar, SnackbarComponent };
};

export default useToast;
