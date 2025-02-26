import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { Container, Typography } from "@mui/material";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <EmployeeForm setEmployees={setEmployees} />
      <EmployeeList employees={employees} setEmployees={setEmployees} />
    </Container>
  );
};

export default Employees;