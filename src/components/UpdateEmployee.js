import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

const UpdateEmployee = ({ selectedEmployee, setSelectedEmployee, setEmployees }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setUpdatedEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setUpdatedEmployee({ ...updatedEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/employees/${updatedEmployee.id}`, updatedEmployee)
      .then(res => {
        setEmployees(prev => prev.map(emp => (emp.id === updatedEmployee.id ? res.data : emp)));
        setSelectedEmployee(null);
      })
      .catch(err => console.error("Error updating employee:", err));
  };

  const handleClose = () => {
    setSelectedEmployee(null);
  };

  return (
    <Dialog open={Boolean(selectedEmployee)} onClose={handleClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField label="Employee ID" name="id" value={updatedEmployee.id} fullWidth disabled margin="dense" />
        <TextField label="Name" name="name" value={updatedEmployee.name} onChange={handleChange} fullWidth required margin="dense" />
        <TextField label="Email" name="email" type="email" value={updatedEmployee.email} onChange={handleChange} fullWidth required margin="dense" />
        <TextField label="Department" name="department" value={updatedEmployee.department} onChange={handleChange} fullWidth required margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateEmployee;