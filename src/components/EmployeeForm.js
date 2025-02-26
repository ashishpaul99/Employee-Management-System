import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box } from "@mui/material";

const EmployeeForm = ({ setEmployees }) => {
  const [employee, setEmployee] = useState({ name: "", email: "", department: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(employee.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    axios
      .post("http://localhost:3000/employees", employee)
      .then((res) => setEmployees((prev) => [...prev, res.data]))
      .catch((err) => console.error("Error adding employee:", err));
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              onChange={handleChange}
              required
              error={!!error}
              helperText={error}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Department"
              name="department"
              fullWidth
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small" // Make the button smaller
            >
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EmployeeForm;