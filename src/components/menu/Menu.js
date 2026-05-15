import React from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";  
import { NavLink } from "react-router-dom";  
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Menu = ({ user, role }) => {
  const handleLogout = () => {
    signOut(auth);
    alert("Ви вийшли з системи");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar shadow"> 
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-danger">
          AutoDrive
        </Navbar.Brand> [cite: 18]
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Головна</Nav.Link>  
            <Nav.Link as={NavLink} to="/catalog">Каталог авто</Nav.Link> 
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Вітаємо, <span className="text-light fw-bold">{user.email}</span> ({role})
                </Navbar.Text>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Вийти</Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="text-danger fw-bold">Увійти</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}; 

export default Menu;