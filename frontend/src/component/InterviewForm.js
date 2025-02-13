// InterviewForm.js
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

function InterviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const handleScheduleInterview = async () => {
    try {
      await axios.post("http://localhost:5000/schedule-interview", {
        name,
        email,
        date,
      });
      alert("Interview scheduled successfully!");
      // Reset the form after successful scheduling
      setName("");
      setEmail("");
      setDate("");
      window.location.href = "/";
    } catch (error) {
      console.error("Error scheduling interview:", error.message);
    }
  };
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Schedule Interview
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date"
            type="datetime-local"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleScheduleInterview}
          >
            Schedule Interview
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InterviewForm;
