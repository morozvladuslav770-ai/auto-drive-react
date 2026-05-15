import React from 'react';
import { Row } from 'react-bootstrap';
import CarCard from './CarCard';

const CarList = ({ cars, onDetailClick}) => {
  return (
    <Row>
      {cars.map((car) => (
        <CarCard 
          key={car.id} 
          {...car} 
          onDetailClick={onDetailClick} 
        />
      ))}
    </Row>
  );
};

export default CarList;