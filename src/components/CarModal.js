import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CarModal = ({ show, onHide, car, onAction, role }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (role === 'guest') {
      onHide();
      navigate('/register');
    } else {
      onAction(`${car.brand} ${car.model}`); 
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{car ? `${car.brand} ${car.model}` : 'Деталі'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {car ? (
          <>
            <h4>Ціна: <span className="text-danger">{car.price}</span></h4> 
            <p><strong>Потужність:</strong> {car.hp} кінських сил.</p> 
            <p>Цей автомобіль доступний для тест-драйву в нашому салоні.</p> 
          </>
        ) : (
          <p>Завантаження...</p> 
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Закрити</Button>
        <Button 
          variant="danger" 
          onClick={handleButtonClick}
        >
          {role === 'guest' ? 'Зареєструватись для запису' : 'Записатись на тест-драйв'}
        </Button> 
      </Modal.Footer>
    </Modal>
  );
}; 

export default CarModal;