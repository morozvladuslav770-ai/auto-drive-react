import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap'; 

const TestDriveForm = ({ cars, onAdd, user }) => {
  const [selectedCarId, setSelectedCarId] = useState(''); 
  const [date, setDate] = useState(''); 
  const [time, setTime] = useState(''); 
  const [clientName, setClientName] = useState(user?.email ? user.email.split('@')[0] : ''); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (selectedCarId && date && time && clientName.trim()) { 
      const car = cars.find(c => c.id.toString() === selectedCarId); 
      const carName = car ? `${car.brand} ${car.model}` : 'Невідоме авто'; 
      
      const success = await onAdd({
        carId: selectedCarId,
        carName: carName,
        clientName: clientName,
        date: date,
        time: time
      });

      if (success) {
        alert("Ви успішно записалися на тест-драйв!");
        setSelectedCarId(''); 
        setDate('');
        setTime(''); 
      }
    }
  };

  return (
    <Card className="mb-4 shadow-sm border-0 bg-white"> 
      <Card.Body className="p-4">
        <h5 className="mb-4 fw-bold border-bottom pb-2 text-dark">Новий запис на тест-драйв</h5>
        <Form onSubmit={handleSubmit}> 
          <Row className="g-3"> 
            
            <Col md={6}> 
              <Form.Group> 
                <Form.Label className="text-muted small fw-bold mb-1">Автомобіль</Form.Label> 
                <Form.Select 
                  value={selectedCarId} 
                  onChange={(e) => setSelectedCarId(e.target.value)} 
                  required 
                  className="shadow-none border-secondary-subtle"
                >
                  <option value="">-- Оберіть авто з каталогу --</option> 
                  {cars?.map(car => ( 
                    <option key={car.id} value={car.id}>
                      {car.brand} {car.model} 
                    </option> 
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}> 
              <Form.Group> 
                <Form.Label className="text-muted small fw-bold mb-1">Ваше Ім'я / ПІБ</Form.Label> 
                <Form.Control 
                  type="text" 
                  placeholder="Введіть ваше ім'я" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)} 
                  required 
                  className="shadow-none border-secondary-subtle" 
                />
              </Form.Group> 
            </Col>

            <Col md={6}> 
              <Form.Group> 
                <Form.Label className="text-muted small fw-bold mb-1">Дата тест-драйву</Form.Label> 
                <Form.Control 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                  className="shadow-none border-secondary-subtle"
                />
              </Form.Group> 
            </Col>

            <Col md={6}>
              <Form.Group> 
                <Form.Label className="text-muted small fw-bold mb-1">Час</Form.Label> 
                <Form.Control 
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)} 
                  required 
                  className="shadow-none border-secondary-subtle" 
                />
              </Form.Group> 
            </Col>

            <Col xs={12} className="text-end mt-4"> 
              <Button variant="danger" type="submit" className="fw-bold px-4 py-2 w-100 w-sm-auto"> 
                Запланувати поїздку
              </Button>
            </Col>

          </Row> 
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TestDriveForm;