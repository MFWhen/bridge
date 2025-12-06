import React from "react"; 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav"; 
import Navbar from "react-bootstrap/Navbar"; 
import { Link, useNavigate } from "react-router-dom"; 
import { isLoggedIn, logout } from "../utils/api";


function NavigationBar() { 
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
  };

  return ( 
    <Navbar bg="light" data-bs-theme="light" fixed="top"> 
      <Container> 
        <Nav className="me-auto"> 
          {loggedIn ? (
            <>
              <Nav.Link> 
                <Link to="/expenses">Expenses</Link> 
              </Nav.Link> 
              <Nav.Link> 
                <Link to="/income">Incomes</Link> 
              </Nav.Link>
              <Nav.Link> 
                <Link to="/profile">Profile</Link> 
              </Nav.Link>
              <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link> 
                <Link to="/login">Sign In</Link> 
              </Nav.Link>
              <Nav.Link> 
                <Link to="/register">Sign Up</Link> 
              </Nav.Link>
            </>
          )}
        </Nav> 
      </Container> 
    </Navbar> 
  ); 
} 
 
export default NavigationBar;