import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import "./adminLogin.css";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api";
import CircularProgress from "@mui/material/CircularProgress";
import useToast from "../../components/ui/Toast";
import { useDispatch } from "react-redux";
import { setActiveUser, setToken } from "../../redux/reducers/auth";

const LoginModal = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const { showSnackbar, SnackbarComponent } = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showSnackbar("Please add email or password", "error");
    } else {
      login({
        email: formData.email,
        password: formData.password,
      })
        .then((res) => {
          if (res.error) {
            showSnackbar(res.error.data.error, "error");
          } else if (res.data.message) {
            if (res.data.user.role !== "admin") {
              showSnackbar("Invalid email or password", "error");
              return;
            }
            showSnackbar("Login Success", "success");
            dispatch(setActiveUser(res.data.user));
            dispatch(setToken(res.data.token));
            navigate("/admin");
          }
        })
        .catch((err) => showSnackbar(err.message, "error"));
    }
  };

  return (
    <div className="hide">
      <Modal
        open={true}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        className="login-modal-container"
      >
        <form onSubmit={handleLogin} className="login-modal">
          <h2 id="login-modal-title">Login</h2>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button variant="contained" type="submit">
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} size={25} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Modal>
      {SnackbarComponent}
    </div>
  );
};

export default LoginModal;
