import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
} from "@mui/material";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeList = ({ employees, setEmployees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortBy, setSortBy] = useState("name"); // Default sorting by name
  const [filter, setFilter] = useState({ name: "", email: "", department: "" });

  // Handle sorting
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "email") {
      return a.email.localeCompare(b.email);
    } else if (sortBy === "department") {
      return a.department.localeCompare(b.department);
    }
    return 0;
  });

  // Handle filtering
  const filteredEmployees = sortedEmployees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      employee.email.toLowerCase().includes(filter.email.toLowerCase()) &&
      employee.department.toLowerCase().includes(filter.department.toLowerCase())
    );
  });

  // Handle delete employee
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/employees/${id}`)
      .then(() => setEmployees((prev) => prev.filter((emp) => emp.id !== id)))
      .catch((err) => console.error("Error deleting employee:", err));
  };

  return (
    <>
      {/* Sorting and Filtering Controls */}
      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Sort By Dropdown */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="department">Department</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Filter by Name */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Filter by Name"
              variant="outlined"
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              fullWidth
            />
          </Grid>

          {/* Filter by Email */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Filter by Email"
              variant="outlined"
              value={filter.email}
              onChange={(e) => setFilter({ ...filter, email: e.target.value })}
              fullWidth
            />
          </Grid>

          {/* Filter by Department */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Filter by Department"
              variant="outlined"
              value={filter.department}
              onChange={(e) => setFilter({ ...filter, department: e.target.value })}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>

      {/* Employee Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Employee Dialog */}
      {selectedEmployee && (
        <UpdateEmployee
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          setEmployees={setEmployees}
        />
      )}
    </>
  );
};

export default EmployeeList;