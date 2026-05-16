import React, { useState } from 'react';
import { Container, Table, Form, Button, Badge, Card, ListGroup, Spinner, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { useOrders } from '../hooks/useOrders';
import { useCars } from '../hooks/useCars';
import { Navigate } from 'react-router-dom';

const AdminPage = ({ role }) => {
  const { orders, loadingOrders, updateOrderStatus, deleteOrder } = useOrders(role);
  const { carsData, addCar, deleteCar, convertFileToBase64 } = useCars();

  const [newCar, setNewCar] = useState({ brand: '', model: '', price: '$', hp: '' });
  const [imageFile, setImageFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const calculateOrderTotal = (items) => {
    if (!items || !items.length) return 0;
    return items.reduce((total, car) => {
      const priceNum = Number(car.price.replace(/[^0-9]/g, ''));
      return total + priceNum;
    }, 0).toLocaleString();
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'очікує підтвердження': return 'warning';
      case 'В обробці': return 'primary';
      case 'Виконано': return 'success';
      case 'Скасовано': return 'danger';
      default: return 'secondary';
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddCarSubmit = async (e) => {
    e.preventDefault();
    if (!newCar.brand || !newCar.model || !newCar.price || !newCar.hp || !imageFile) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }
    if (!newCar.price.startsWith('$')) {
      alert("Ціна повинна починатися зі знаку $, наприклад: $45,000");
      return;
    }

    try {
      setProcessing(true);
      const base64Image = await convertFileToBase64(imageFile);
      const success = await addCar({ ...newCar, img: base64Image });
      if (success) {
        alert("Автомобіль успішно додано!");
        setNewCar({ brand: '', model: '', price: '$', hp: '' });
        setImageFile(null);
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  if (loadingOrders) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="danger" />
        <h3 className="mt-3 text-white">Синхронізація з сервером...</h3>
      </Container>
    );
  }

  return (
    <Container className="py-3 py-md-5">
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4 border-bottom pb-3 border-danger border-3">
        <h2 className="fw-bold text-uppercase mb-2 mb-sm-0 text-black text-center text-sm-start fs-3 fs-md-2">
          Панель адміністратора
        </h2>
      </div>

      <Tabs defaultActiveKey="orders" id="admin-tabs" className="mb-4 custom-tabs flex-nowrap overflow-auto">
        
        <Tab eventKey="orders" title={`📦 Замовлення (${orders.length})`}>
          {orders.length === 0 ? (
            <Card className="text-center py-5 border-0 shadow-sm">
              <Card.Body><h3 className="text-muted">Активних замовлень немає.</h3></Card.Body>
            </Card>
          ) : (
            <>
              <div className="table-responsive shadow-sm rounded-3 bg-white p-3 d-none d-lg-block">
                <Table hover align="middle" className="mb-0">
                  <thead className="table-dark text-uppercase small">
                    <tr>
                      <th>Дата</th>
                      <th>Клієнт</th>
                      <th>Автомобілі</th>
                      <th>Сума</th>
                      <th>Статус</th>
                      <th>Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="text-muted small">{order.dateStr}</td>
                        <td>
                          <div className="fw-bold">{order.userEmail}</div>
                          <div className="text-muted small">ID: {order.userId}</div>
                        </td>
                        <td>
                          <ListGroup variant="flush" className="p-0 bg-transparent">
                            {order.items?.map((car, idx) => (
                              <ListGroup.Item key={idx} className="p-1 bg-transparent border-0 small d-flex align-items-center">
                                <img src={car.img} alt={car.model} className="rounded me-2" style={{ width: '40px', height: '25px', objectFit: 'cover' }} />
                                <span>{car.brand} {car.model} <strong className="text-danger">({car.price})</strong></span>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </td>
                        <td className="fw-bold fs-5">${calculateOrderTotal(order.items)}</td>
                        <td>
                          <div className="d-flex flex-column gap-2">
                            <Badge bg={getStatusBadgeColor(order.status)} className="text-uppercase mb-1">{order.status}</Badge>
                            <Form.Select 
                              size="sm" 
                              value={order.status} 
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              style={{ width: '180px' }}
                            >
                              <option value="очікує підтвердження">Очікує підтвердження</option>
                              <option value="В обробці">В обробці</option>
                              <option value="Виконано">Виконано</option>
                              <option value="Скасовано">Скасовано</option>
                            </Form.Select>
                          </div>
                        </td>
                        <td>
                          <Button variant="outline-danger" size="sm" onClick={() => { if(window.confirm("Видалити?")) deleteOrder(order.id) }}>Видалити</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="d-lg-none">
                {orders.map((order) => (
                  <Card key={order.id} className="mb-3 border-0 shadow-sm rounded-3">
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                        <span className="text-muted small">{order.dateStr}</span>
                        <Badge bg={getStatusBadgeColor(order.status)} className="text-uppercase">{order.status}</Badge>
                      </div>
                      
                      <div className="mb-2">
                        <div className="fw-bold text-dark truncate-text">{order.userEmail}</div>
                      </div>

                      <div className="bg-light p-2 rounded mb-3">
                        <div className="small text-muted mb-1 fw-bold">Замовлені авто:</div>
                        {order.items?.map((car, idx) => (
                          <div key={idx} className="d-flex align-items-center mb-1 pb-1 border-bottom-dashed last-no-border">
                            <img src={car.img} alt={car.model} className="rounded me-2" style={{ width: '35px', height: '22px', objectFit: 'cover' }} />
                            <span className="small text-dark">{car.brand} {car.model} <strong className="text-danger">({car.price})</strong></span>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold">Разом:</span>
                        <span className="fw-bold fs-4 text-danger">${calculateOrderTotal(order.items)}</span>
                      </div>

                      <div className="d-flex gap-2 align-items-center border-top pt-2">
                        <Form.Select 
                          size="sm" 
                          value={order.status} 
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="w-100"
                        >
                          <option value="очікує підтвердження">Змінити статус</option>
                          <option value="В обробці">В обробці</option>
                          <option value="Виконано">Виконано</option>
                          <option value="Скасовано">Скасовано</option>
                        </Form.Select>
                        <Button variant="danger" size="sm" className="px-3" onClick={() => { if(window.confirm("Видалити?")) deleteOrder(order.id) }}>
                          🗑️
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Tab>

        <Tab eventKey="catalog" title="🏎️ Каталог">
          <Row>
            <Col lg={4} className="mb-4">
              <Card className="shadow-sm border-0 p-3 p-md-4 bg-white rounded-3">
                <h4 className="fw-bold text-dark mb-3 border-bottom pb-2 fs-5 fs-md-4">Додати автомобіль</h4>
                <Form onSubmit={handleAddCarSubmit}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small fw-bold text-uppercase mb-1">Марка</Form.Label>
                    <Form.Control type="text" placeholder="Наприклад: Audi" value={newCar.brand} onChange={(e) => setNewCar({...newCar, brand: e.target.value})} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="small fw-bold text-uppercase mb-1">Модель</Form.Label>
                    <Form.Control type="text" placeholder="Наприклад: RS6" value={newCar.model} onChange={(e) => setNewCar({...newCar, model: e.target.value})} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="small fw-bold text-uppercase mb-1">Ціна (з знайому $)</Form.Label>
                    <Form.Control type="text" placeholder="$85,000" value={newCar.price} onChange={(e) => setNewCar({...newCar, price: e.target.value})} required />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="small fw-bold text-uppercase mb-1">Потужність (к.с.)</Form.Label>
                    <Form.Control type="number" placeholder="600" value={newCar.hp} onChange={(e) => setNewCar({...newCar, hp: e.target.value})} required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold text-uppercase mb-1">Фото авто</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
                  </Form.Group>
                  <Button type="submit" variant="danger" className="w-100 fw-bold py-2 text-uppercase" disabled={processing}>
                    {processing ? 'Обробка...' : 'Зберегти в базу'}
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* Список авто */}
            <Col lg={8}>
              <Card className="shadow-sm border-0 p-3 p-md-4 bg-white rounded-3">
                <h4 className="fw-bold text-dark mb-3 border-bottom pb-2 fs-5 fs-md-4">Поточний каталог ({carsData.length})</h4>
                <div className="table-responsive d-none d-md-block" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                  <Table hover align="middle" className="mb-0">
                    <thead className="table-light small text-uppercase sticky-top">
                      <tr>
                        <th>Фото</th>
                        <th>Назва авто</th>
                        <th>Потужність</th>
                        <th>Ціна</th>
                        <th className="text-end">Дія</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carsData.map((car) => (
                        <tr key={car.id}>
                          <td><img src={car.img} alt={car.model} className="rounded" style={{ width: '60px', height: '40px', objectFit: 'cover' }} /></td>
                          <td><strong>{car.brand}</strong> {car.model}</td>
                          <td><Badge bg="dark">{car.hp} к.с.</Badge></td>
                          <td className="fw-bold text-danger">{car.price}</td>
                          <td className="text-end">
                            <Button variant="danger" size="sm" onClick={() => { if(window.confirm("Видалити?")) deleteCar(car.id) }}>Видалити</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <div className="d-md-none" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {carsData.map((car) => (
                    <div key={car.id} className="d-flex align-items-center justify-content-between border-bottom py-2">
                      <div className="d-flex align-items-center">
                        <img src={car.img} alt={car.model} className="rounded me-3 shadow-sm" style={{ width: '65px', height: '45px', objectFit: 'cover' }} />
                        <div>
                          <div className="fw-bold text-dark">{car.brand} {car.model}</div>
                          <span className="badge bg-dark me-2">{car.hp} к.с.</span>
                          <span className="fw-bold text-danger small">{car.price}</span>
                        </div>
                      </div>
                      <Button variant="outline-danger" size="sm" className="px-2" onClick={() => { if(window.confirm("Видалити?")) deleteCar(car.id) }}>
                        🗑️
                      </Button>
                    </div>
                  ))}
                </div>

              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPage;