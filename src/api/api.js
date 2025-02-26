import axios from "axios";

const API_URL = "http://localhost:5000/employees";

export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addEmployee = async (employee) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (id, updatedEmployee) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedEmployee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
