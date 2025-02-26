import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const App = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Employee Management System
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/employees">
        Manage Employees
      </Button>
    </Container>
  );
};

export default App;