import React, { useState } from "react";
import axios from "axios";

const AddEmployee = ({ setEmployees }) => {
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", department: "" });

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const employeeWithId = { ...newEmployee, id: Date.now().toString() }; // Unique ID

    try {
      const res = await axios.post("http://localhost:3000/employees", employeeWithId);
      setEmployees((prev) => [...prev, res.data]);
      setNewEmployee({ name: "", email: "", department: "" });
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input type="text" name="name" placeholder="Name" value={newEmployee.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} />
      <input type="text" name="department" placeholder="Department" value={newEmployee.department} onChange={handleChange} />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
