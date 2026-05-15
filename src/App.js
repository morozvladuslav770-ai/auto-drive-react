import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { useAuth } from './hooks/useAuth';
import { useCars } from './hooks/useCars';

import Menu from "./components/menu/Menu";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import CarModal from "./components/CarModal";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [show, setShow] = useState(false);

  const { user, role, loadingAuth } = useAuth();
  const { carsData, loadingCars } = useCars();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedCar(carsData.find(item => item.id === id));
    setShow(true);
  };

  if (loadingAuth || loadingCars) {
    return (
      <div className="text-center mt-5">
        <h3>Завантаження AutoDrive...</h3>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Menu user={user} role={role} />
      
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/catalog" 
            element={<CatalogPage carsData={carsData} onDetailClick={handleShow} />} 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <CarModal 
          show={show} 
          onHide={handleClose} 
          car={selectedCar} 
          role={role}
          onAction={(name) => alert(`Запит на ${name} прийнято!`)} 
        /> 
      </Container>
    </div>
  );
}

export default App;