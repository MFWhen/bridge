import React from "react"; 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav"; 
import Navbar from "react-bootstrap/Navbar"; 
import { Link } from "react-router-dom"; 


function NavigationBar() { 
  return ( 
    <Navbar bg="dark" data-bs-theme="dark" fixed="top"> 
      <Container> 
        <Nav className="me-auto"> 
          <Nav.Link> 
            <Link to="/">Expenses</Link> 
          </Nav.Link> 
          <Nav.Link> 
            <Link to="/income">Incomes</Link> 
          </Nav.Link> 
          <Nav.Link> 
            <Link to="/profile">Profile</Link> 
          </Nav.Link> 
        </Nav> 
      </Container> 
    </Navbar> 
  ); 
} 
 
export default NavigationBar;