/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dp: null,
    country: "",
    mobile: "",
    isSeller: false,
  });

  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    countryError: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      isSeller: checked,
      mobile: checked ? prevFormData.mobile : "", // Reset mobile if unchecking
    }));
  };

  const handleNameError = () => {
    if (formData.name.trim() === "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        nameError: true,
      }));
      return;
    }
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      nameError: false,
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

  const handleCountryError = () => {
    if (formData.country.trim() === "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        countryError: true,
      }));
      return;
    }
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      countryError: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleNameError();
    handleEmailError();
    handlePasswordError();
    handleCountryError();

    try {
      if (
        !formErrors.nameError &&
        !formErrors.emailError &&
        !formErrors.passwordError &&
        !formErrors.countryError
      ) {
        const formDataToSubmit = new FormData();
        for (const key in formData) {
          formDataToSubmit.append(key, formData[key]);
        }

        const res = await axios.post(
          "http://localhost:8800/api/auth/register",
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerBox">
        <Typography variant="h4" className="registerTitle">
          Register
        </Typography>
        <form className="registerForm" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            error={formErrors.nameError}
            helperText={formErrors.nameError ? "Name is required" : ""}
            onBlur={handleNameError}
            onChange={handleChange}
          />
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
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            name="country"
            value={formData.country}
            error={formErrors.countryError}
            helperText={formErrors.countryError ? "Country is required" : ""}
            onBlur={handleCountryError}
            onChange={handleChange}
          />
          <input
            type="file"
            name="dp"
            accept="image/*"
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isSeller}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Are you a seller?"
          />
          {formData.isSeller && (
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          )}
          <Button
            variant="contained"
            fullWidth
            className="registerButton"
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
