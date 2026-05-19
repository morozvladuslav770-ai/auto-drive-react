import React from 'react';
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";  
import { NavLink } from "react-router-dom";  
import { auth } from "../../firebase";  
import { signOut } from "firebase/auth";  

const Menu = ({ user, role, cartCount }) => {
  const handleLogout = () => {
    signOut(auth);  
    alert("Ви вийшли з системи");  
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar shadow">  
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-danger">
          AutoDrive
        </Navbar.Brand>  
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Головна</Nav.Link>  
            <Nav.Link as={NavLink} to="/catalog">Каталог авто</Nav.Link> 
            <Nav.Link as={NavLink} to="/drive">Тест-Драйв</Nav.Link> 
            
            <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center">
              Корзина
              {cartCount > 0 && ( 
                <Badge bg="danger" pill className="ms-2">
                  {cartCount} 
                </Badge>
              )}
            </Nav.Link>

            {role === 'admin' && (
              <Nav.Link as={NavLink} to="/admin" > ⚙️ Адмін-панель</Nav.Link>
            )}
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