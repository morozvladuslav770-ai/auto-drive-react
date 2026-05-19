import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ 
  searchTerm, setSearchTerm, 
  hpFilter, sethpFilter, 
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice,
  selectedBrand, setSelectedBrand,
  carsData
}) => {
    const brands = [...new Set(carsData.map(car => car.brand))];
  return (
    <Form className="mb-4 p-4 bg-white rounded shadow-sm border-top border-danger border-4">
      <Row className="g-3">
        {/* Пошук за моделлю */}
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold small text-uppercase">Модель</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Наприклад: M5..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Вибір марки зі списку */}
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold small text-uppercase">Марка</Form.Label>
            <Form.Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="all">Усі марки</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Потужність */}
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold small text-uppercase">Потужність (мін. к.с.)</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="0"
              value={hpFilter}
              onChange={(e) => sethpFilter(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Ціна від */}
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold small text-uppercase">Ціна від ($)</Form.Label>
            <Form.Control 
              type="number" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Ціна до */}
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold small text-uppercase">Ціна до ($)</Form.Label>
            <Form.Control 
              type="number" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;