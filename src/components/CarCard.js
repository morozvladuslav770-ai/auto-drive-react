import React, { useState } from 'react';
import { Col, Card, Button, Badge } from 'react-bootstrap';

const CarCard = ( {img, id, brand, model, price, onDetailClick }) => { 
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card 
        className={`custom-card shadow-sm h-100 ${selected ? 'border-danger border-3' : ''}`}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
        
      >
        <Card.Img variant="top" src={img} />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold">
            {brand} {model}
            {selected && <Badge bg="danger" className="ms-2">Обрано</Badge>}
          </Card.Title>

          <Card.Text className="flex-grow-1 fs-5">
            Від: <strong>{price}</strong>
          </Card.Text>
          
          <Button 
            variant="dark" 
            onClick={(e) => {
              e.stopPropagation();
              onDetailClick(id);
            }}
          >
            Детальніше
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CarCard;