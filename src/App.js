import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { useAuth } from './hooks/useAuth';
import { useCars } from './hooks/useCars';
import { useCart } from './hooks/useCart';

import Menu from "./components/menu/Menu";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/catalog/CatalogPage";
import CarModal from "./components/catalog/CarModal";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CartPage from './components/CartPage';
import AdminPage from './components/AdminPage';
import TestDrivePage from './components/tdrive/TestDrivePage';
import './App.css';

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [show, setShow] = useState(false);

  const { user, role, loadingAuth } = useAuth();
  const { carsData, loadingCars } = useCars();
  const { cart, addToCart, removeFromCart, createOrder } = useCart(user);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedCar(carsData.find(item => item.id === id));
    setShow(true);
  };

  const handleAddToCart = (car) => {
    addToCart(car);
    handleClose();
  };

  if (loadingAuth || loadingCars) {
    return (
      <div className="text-center mt-5 text-white">
        <h3>Завантаження AutoDrive...</h3>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Menu user={user} role={role} cartCount={cart.length} />
      
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/catalog" 
            element={<CatalogPage carsData={carsData} onDetailClick={handleShow} />}
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart} 
                user={user} 
                removeFromCart={removeFromCart} 
                createOrder={createOrder} 
              />
            } 
          />
          <Route path="/drive" element={<TestDrivePage cars={carsData} user={user} role={role} />} 
/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage role={role} />} />
        </Routes>

        <CarModal 
          show={show} 
          onHide={handleClose} 
          car={selectedCar}
          role={role}
          onAction={handleAddToCart}
        /> 
      </Container>
    </div>
  );
}

export default App;