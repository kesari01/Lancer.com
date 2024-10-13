/* eslint-disable no-unused-vars */
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./AddNewGig.css";

const services = [
  { value: "Graphics_Design", label: "Graphics & Design" },
  { value: "Video_Animation", label: "Video & Animation" },
  { value: "Writing_Translation", label: "Writing & Translation" },
  { value: "AI_Services", label: "AI Services" },
  { value: "Digital_Marketing", label: "Digital Marketing" },
  { value: "Music_Audio", label: "Music & Audio" },
  { value: "Programming_Tech", label: "Programming & Tech" },
  { value: "Business", label: "Business" },
  { value: "Lifestyle", label: "Lifestyle" },
];

export default function InputForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    service: "",
    description: "",
    message: "",
    price: "",
    deliveryTime: "",
    modificationAllowed: "",
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
  });

  const [formErrors, setFormErrors] = useState({
    titleError: false,
    authorError: false,
    serviceError: false,
    descriptionError: false,
    messageError: false,
    priceError: false,
    deliveryTimeError: false,
    modificationAllowedError: false,
    feature1Error: false,
    feature2Error: false,
    feature3Error: false,
    feature4Error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //handle title error
  const handleTitleError = () => {
    if (
      !formData.title ||
      formData.title.length < 3 ||
      formData.title.length > 15
    ) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        titleError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      titleError: false,
    }));
  };

  //handle author error
  const handleAuthorError = () => {
    if (
      !formData.author ||
      formData.author.length < 3 ||
      formData.author.length > 15
    ) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        authorError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      authorError: false,
    }));
  };

  //set image value
  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };
  //handle service error
  const handleServiceError = () => {
    if (!formData.service) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        serviceError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      serviceError: false,
    }));
  };

  //handle description error
  const handleDescriptionError = () => {
    if (
      !formData.description ||
      formData.description.length < 10 ||
      formData.description.length > 100
    ) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        descriptionError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      descriptionError: false,
    }));
  };

  //handle message error
  const handleMessageError = () => {
    if (
      !formData.message ||
      formData.message.length < 5 ||
      formData.message.length > 50
    ) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        messageError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      messageError: false,
    }));
  };

  //handle price error
  const handlePriceError = () => {
    if (
      !formData.price ||
      isNaN(formData.price) ||
      parseFloat(formData.price) <= 0
    ) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        priceError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      priceError: false,
    }));
  };

  //handle delivery error
  const handleDeliveryTimeError = () => {
    if (
      !formData.deliveryTime ||
      isNaN(formData.deliveryTime) ||
      parseInt(formData.deliveryTime) <= 0
    ) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        deliveryTimeError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      deliveryTimeError: false,
    }));
  };

  //handle modification error
  const handleModificationAllowedError = () => {
    if (!formData.modificationAllowed || isNaN(formData.modificationAllowed)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        modificationAllowedError: true,
      }));
      return;
    }
    //if no error then set the value
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      modificationAllowedError: false,
    }));
  };

  //handle feature error
  const handleFeatureError = () => {
    const features = [
      formData.feature1,
      formData.feature2,
      formData.feature3,
      formData.feature4,
    ];
    let hasError = false;

    features.forEach((feature, index) => {
      if (!feature || feature.length < 3 || feature.length > 20) {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [`featureError${index + 1}`]: true,
        }));
        hasError = true;
      } else {
        //if no error then set the value
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [`featureError${index + 1}`]: false,
        }));
      }
    });
    return hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const isValid = handleValidation();
    // if (!isValid) return;

    // try {
    //   const res = await fetch("http://localhost:3000/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (res.ok) {
    //     setFormData({
    //       title: "",
    //       author: "",
    //       services: "",
    //       description: "",
    //       message: "",
    //       price: "",
    //       deliveryTime: "",
    //       modificationAllowed: "",
    //       feature1: "",
    //       feature2: "",
    //       feature3: "",
    //       feature4: "",
    //     });
    //     setFormErrors({
    //       titleError: false,
    //       authorError: false,
    //       servicesError: false,
    //       descriptionError: false,
    //       messageError: false,
    //       priceError: false,
    //       deliveryTimeError: false,
    //       modificationAllowedError: false,
    //       feature1Error: false,
    //       feature2Error: false,
    //       feature3Error: false,
    //       feature4Error: false,
    //     });
    //     window.location.href = "/"; // Navigate to the home route
    //   }
    // } catch (err) {
    //   console.log("Error in register", err);
    // }
  };

  return (
    <div className="addNewGig">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/manage-gig">Manage Gigs</Breadcrumb.Item>
        <Breadcrumb.Item active>Add New Gig</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Add New Gig</h2>
      <div className="addNewGigContainer">
        <div className="addNewGigContainerLeft">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={formData.title}
            error={formErrors.titleError}
            onBlur={handleTitleError}
            onChange={handleChange}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            name="author"
            value={formData.author}
            error={formErrors.authorError}
            onBlur={handleAuthorError}
            onChange={handleChange}
          />
          <TextField
            label="Service"
            variant="outlined"
            fullWidth
            name="service"
            value={formData.service}
            error={formErrors.serviceError}
            onBlur={handleServiceError}
            onChange={handleChange}
            select // Add this prop to enable the dropdown
          >
            {services.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField name="upload-photo" type="file" />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            name="description"
            value={formData.description}
            error={formErrors.descriptionError}
            onBlur={handleDescriptionError}
            onChange={handleChange}
          />
        </div>
        <div className="addNewGigContainerRight">
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            name="message"
            value={formData.message}
            error={formErrors.messageError}
            onBlur={handleMessageError}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            name="price"
            value={formData.price}
            error={formErrors.priceError}
            onBlur={handlePriceError}
            onChange={handleChange}
          />
          <TextField
            label="Delivery Time"
            variant="outlined"
            fullWidth
            name="deliveryTime"
            value={formData.deliveryTime}
            error={formErrors.deliveryTimeError}
            onBlur={handleDeliveryTimeError}
            onChange={handleChange}
          />
          <TextField
            label="Modification Allowed"
            variant="outlined"
            fullWidth
            name="modificationAllowed"
            value={formData.modificationAllowed}
            error={formErrors.modificationAllowedError}
            onBlur={handleModificationAllowedError}
            onChange={handleChange}
          />
          <Typography variant="subtitle1" gutterBottom>
            Features
          </Typography>
          <TextField
            label="Feature 1"
            variant="outlined"
            fullWidth
            name="feature1"
            value={formData.feature1}
            error={formErrors.feature1Error}
            onBlur={handleFeatureError}
            onChange={handleChange}
          />
          <TextField
            label="Feature 2"
            variant="outlined"
            fullWidth
            name="feature2"
            value={formData.feature2}
            error={formErrors.feature2Error}
            onBlur={handleFeatureError}
            onChange={handleChange}
          />
          <TextField
            label="Feature 3"
            variant="outlined"
            fullWidth
            name="feature3"
            value={formData.feature3}
            error={formErrors.feature3Error}
            onBlur={handleFeatureError}
            onChange={handleChange}
          />
          <TextField
            label="Feature 4"
            variant="outlined"
            fullWidth
            name="feature4"
            value={formData.feature4}
            error={formErrors.feature4Error}
            onBlur={handleFeatureError}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}
