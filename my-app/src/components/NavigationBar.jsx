import React from "react"; 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav"; 
import Navbar from "react-bootstrap/Navbar"; 
import { Link } from "react-router-dom"; 


function NavigationBar() { 
  return ( 
    <Navbar bg="light" data-bs-theme="light" fixed="top"> 
      <Container> 
        <Nav className="me-auto"> 
        <Nav.Link> 
            <Link to="/">Expenses</Link> 
          </Nav.Link> 
          <Nav.Link> 
            <Link to="/income"> Incomes</Link> 
          </Nav.Link> 
          <Nav.Link> 
            <Link to="/login"> Sign In</Link> 
          </Nav.Link>
          <Nav.Link> 
            <Link to="/register"> Sign Up</Link> 
          </Nav.Link>
          <Nav.Link> 
            <Link to="/profile"> Profile</Link> 
          </Nav.Link> 
        </Nav> 
      </Container> 
    </Navbar> 
  ); 
} 
 
export default NavigationBar;