import React, { useState } from "react";
import {
    Button,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    TextField,
    Typography,
    Modal,
    Slider,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Checkbox,
  } from "@material-ui/core";
import Sidebar from "./sidebar";
import "./Sidebar.css";  

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState("Send");
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");

    // Code to handle form submission goes here

    // Reset form status after submission
    setTimeout(() => {
        setShowAlert(true); 
        setFormStatus("Send");
        // Show the alert after submission
        setTimeout(() => {
          setShowAlert(false); // Hide the alert after 3 seconds
        }, 3000);
      }, 2000); // Reset form status after 2 seconds
  };

  return (
    
    <>
    <Sidebar></Sidebar>


    <div class="bg-img-container1">
         <img src="1.jpg" class="bg-img1" />  
        <h4 class ="heading">
          <strong> Contact us</strong> 
        </h4> 
      <form onSubmit={onSubmit} className="contact-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" required></textarea>
        </div>
        <button
          type="submit"
          className={`submit-button ${formStatus === "Submitting..." ? "submitting" : ""}`}
        >
          {formStatus}
        </button>
      </form>
      {showAlert && (
        <div className="notification-alert">
          Form submitted successfully!
        </div>
      )}
      
      </div>

    </>
  );
};

export default ContactForm;
