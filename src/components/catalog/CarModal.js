import React from 'react';
import { Modal, Button } from 'react-bootstrap';  
import { useNavigate } from 'react-router-dom';  

const CarModal = ({ show, onHide, car, onAction, role }) => {
  const navigate = useNavigate();  

  const handleButtonClick = () => {
    if (role === 'guest') {
      onHide();  
      navigate('/login'); 
    } else {
      onAction(car); 
      onHide(); 
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>  
      <Modal.Header closeButton className="bg-dark text-white text-uppercase">
        <Modal.Title>{car ? `${car.brand} ${car.model}` : 'Деталі'}</Modal.Title>  
      </Modal.Header>
      <Modal.Body>
        {car ? (
          <>
            <div className="text-center mb-3">
               <img src={car.img} alt={car.model} className="img-fluid rounded shadow-sm" style={{ maxHeight: '250px' }} />
            </div>
            <h4>Ціна: <span className="text-danger">{car.price}</span></h4>  
            <p className="mb-1"><strong>Потужність:</strong> {car.hp} к.с.</p> 
            <p className="text-muted small">Після додавання до корзини ви зможете оформити офіційне замовлення.</p>
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
          className="fw-bold"
        >
          {role === 'guest' ? 'Авторизуватися для покупки' : 'Додати до корзини'} 
        </Button> 
      </Modal.Footer>
    </Modal>
  );
}; 

export default CarModal;