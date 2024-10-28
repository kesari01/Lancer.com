/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const [formErrors, setFormErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEmailError = () => {
    if (!formData.email.includes("@")) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        emailError: true,
      }));
      return;
    }
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      emailError: false,
    }));
  };

  const handlePasswordError = () => {
    if (formData.password.length < 6) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        passwordError: true,
      }));
      return;
    }
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      passwordError: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEmailError();
    handlePasswordError();
    try {
      if (!formErrors.emailError && !formErrors.passwordError) {
        const res = await axios.post("http://localhost:8800/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <Typography variant="h4" className="loginTitle">
          Login
        </Typography>
        <form className="loginForm" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            error={formErrors.emailError}
            helperText={formErrors.emailError ? "Invalid email" : ""}
            onBlur={handleEmailError}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            error={formErrors.passwordError}
            helperText={formErrors.passwordError ? "Minimum 6 characters" : ""}
            onBlur={handlePasswordError}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            fullWidth
            className="loginButton"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
