import React from "react"; 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav"; 
import Navbar from "react-bootstrap/Navbar"; 
import { Link, useNavigate } from "react-router-dom"; 
import { isLoggedIn, logout, getUser } from "../utils/api";


function NavigationBar() { 
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getUser();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
  };

  return ( 
    <Navbar 
      sticky="top" 
      style={{
        background: 'linear-gradient(to right, #2563eb, #1e40af)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '70px',
        borderRadius: 0
      }} 
      data-bs-theme="dark"
    > 
      <Container> 
        <Nav 
          className="me-auto d-flex align-items-center" 
          style={{ columnGap: '1.5rem' }}
        > 
          {loggedIn ? (
            <>
              {isAdmin ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    style={{ color: 'white', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Database
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/expenses"
                    style={{ color: 'white', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Expenses
                  </Nav.Link> 
                  <Nav.Link
                    as={Link}
                    to="/income"
                    style={{ color: 'white', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Income
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    style={{ color: 'white', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Profile
                  </Nav.Link>
                </>
              )}
              <Nav.Link 
                onClick={handleLogout} 
                style={{ cursor: 'pointer', color: 'white', fontWeight: '600' }}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" style={{ color: 'white', fontWeight: '600' }}> 
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/register" style={{ color: 'white', fontWeight: '600' }}>
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav> 
      </Container> 
    </Navbar> 
  ); 
} 
 
export default NavigationBar;