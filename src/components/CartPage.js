import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Badge, ListGroup, Form, Tabs, Tab, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserOrders } from '../hooks/useUserOrders';

const CartPage = ({ cart, user, removeFromCart, createOrder }) => {
  const navigate = useNavigate();
  const { userOrders, loadingUserOrders } = useUserOrders(user);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    comment: ''
  });

  const calculateTotal = () => {
    return cart.reduce((total, car) => {
      const priceNum = Number(car.price.replace(/[^0-9]/g, ''));
      return total + priceNum;
    }, 0).toLocaleString();
  };

  const calculateOrderTotal = (items) => {
    if (!items || !items.length) return 0;
    return items.reduce((total, car) => {
      const priceNum = Number(car.price.replace(/[^0-9]/g, ''));
      return total + priceNum;
    }, 0).toLocaleString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinish = async (e) => {
    e.preventDefault(); 
    if (cart.length === 0) return;

    const success = await createOrder(user, formData);
    if (success) {
      alert("Дякуємо! Ваша заявка на купівлю прийнята. Менеджер зв'яжеться з вами найближчим часом.");
      setFormData({ name: '', phone: '', city: '', comment: '' });
      navigate('/');
    }
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

  return (
    <Container className="py-5">
      <Tabs defaultActiveKey="cart" id="cart-page-tabs" className="mb-4 custom-tabs">
        
        {/* ВКЛАДКА 1: КОРЗИНА ТА ОФОРМЛЕННЯ */}
        <Tab eventKey="cart" title={`🛒 Корзина (${cart.length})`}>
          <div className="d-flex align-items-center mb-4 border-bottom pb-3 border-danger border-3">
            <h2 className="fw-bold text-uppercase mb-0">Моя корзина</h2>
            <Badge bg="danger" pill className="ms-3 fs-5">{cart.length}</Badge>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-5 bg-white rounded shadow-sm border">
              <div className="display-1 text-muted mb-4">🛒</div>
              <h3 className="text-muted">Ваша корзина поки що порожня</h3>
              <p className="mb-4">Перейдіть до каталогу, щоб обрати авто своєї мрії.</p>
              <Button variant="danger" size="lg" onClick={() => navigate('/catalog')}>
                Переглянути авто
              </Button>
            </div>
          ) : (
            <Row>
              {/* Список автомобілів */}
              <Col lg={7}>
                {cart.map((car, index) => (
                  <Card key={index} className="mb-4 shadow-sm border-0 overflow-hidden custom-card-hover">
                    <Row className="g-0">
                      <Col md={4}>
                        <Card.Img 
                          src={car.img} 
                          className="h-100 object-fit-cover" 
                          style={{ minHeight: '160px' }}
                        />
                      </Col>
                      <Col md={8}>
                        <Card.Body className="d-flex flex-column h-100 justify-content-between">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <Card.Title className="fw-bold fs-4 mb-1">{car.brand} {car.model}</Card.Title>
                              <Badge bg="dark" className="text-uppercase">{car.hp} к.с.</Badge>
                            </div>
                            <Button 
                              variant="link" 
                              className="text-danger p-0 text-decoration-none fw-bold"
                              onClick={() => removeFromCart(index)}
                            >
                              Видалити
                            </Button>
                          </div>
                          <div className="mt-3">
                            <span className="text-muted small d-block">Ціна за одиницю:</span>
                            <span className="fs-4 fw-bold text-danger">{car.price}</span>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Col>

              {/* Форма оформлення та підсумок */}
              <Col lg={5}>
                {/* Форма даних покупця */}
                <Card className="border-0 shadow-sm p-4 bg-white rounded-4 mb-4">
                  <h4 className="fw-bold mb-3 text-dark border-bottom pb-2">Контактні дані</h4>
                  <Form onSubmit={handleFinish}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-uppercase">Ваше Ім'я та Прізвище</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        placeholder="Іван Іванов" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-uppercase">Телефон</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="phone"
                        placeholder="+380XXXXXXXXX" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-uppercase">Місто доставки / Огляду</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="city"
                        placeholder="Київ" 
                        value={formData.city}
                        onChange={handleInputChange}
                        required 
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold text-uppercase">Коментар до замовлення (необов'язково)</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        name="comment"
                        rows={2} 
                        placeholder="Бажаний час для дзвінка чи додаткові питання..." 
                        value={formData.comment}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    {/* Панель підсумку всередині форми */}
                    <Card className="bg-dark text-white p-3 rounded-3 mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Кількість авто:</span>
                        <strong>{cart.length} шт.</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center fs-5 border-top border-secondary pt-2">
                        <span>Разом до сплати:</span>
                        <strong className="text-danger">${calculateTotal()}</strong>
                      </div>
                    </Card>

                    <Button 
                      type="submit"
                      variant="danger" 
                      size="lg" 
                      className="w-100 py-3 fw-bold text-uppercase shadow"
                    >
                      Підтвердити замовлення
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          )}
        </Tab>

        {/* ВКЛАДКА 2: ІСТОРІЯ ЗАМОВЛЕНЬ ПОКУПЦЯ */}
        <Tab eventKey="orders" title="📦 Мої замовлення">
          <div className="d-flex align-items-center mb-4 border-bottom pb-3 border-danger border-3">
            <h2 className="fw-bold text-uppercase mb-0">Історія замовлень</h2>
          </div>

          {loadingUserOrders ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
              <p className="mt-2 text-muted">Завантаження вашої історії замовлень...</p>
            </div>
          ) : userOrders.length === 0 ? (
            <div className="text-center py-5 bg-white rounded shadow-sm border">
              <h3 className="text-muted">Ви ще не робили замовлень</h3>
              <p>Тут з'явиться історія ваших покупок після оформлення першої заявки.</p>
            </div>
          ) : (
            <Row>
              <Col lg={12}>
                {userOrders.map((order) => (
                  <Card key={order.id} className="mb-4 border-0 shadow-sm rounded-3 overflow-hidden">
                    <Card.Header className="bg-dark text-white d-flex flex-column flex-sm-row justify-content-between align-items-sm-center py-3 gap-2">
                      <div>
                        <span className="text-muted small d-block">ID ЗАМОВЛЕННЯ: {order.id}</span>
                        <strong className="fs-6">{order.dateStr}</strong>
                      </div>
                      <div className="text-sm-end">
                        <span className="me-2 small text-muted">Статус:</span>
                        <Badge bg={getStatusBadgeColor(order.status)} className="text-uppercase p-2 fs-6">
                          {order.status}
                        </Badge>
                      </div>
                    </Card.Header>
                    <Card.Body className="bg-white p-4">
                      <Row>
                        {/* Список автомобілів у замовленні */}
                        <Col md={7} className="border-end-md">
                          <h5 className="fw-bold text-muted mb-3 small text-uppercase">Замовлені авто</h5>
                          <ListGroup variant="flush">
                            {order.items?.map((car, idx) => (
                              <ListGroup.Item key={idx} className="px-0 py-2 d-flex align-items-center justify-content-between bg-transparent">
                                <div className="d-flex align-items-center">
                                  <img 
                                    src={car.img} 
                                    alt={car.model} 
                                    className="rounded me-3" 
                                    style={{ width: '60px', height: '40px', objectFit: 'cover' }} 
                                  />
                                  <div>
                                    <span className="fw-bold d-block">{car.brand} {car.model}</span>
                                    <small className="text-muted">{car.hp} к.с.</small>
                                  </div>
                                </div>
                                <span className="fw-bold text-danger">{car.price}</span>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Col>

                        {/* Дані доставки цього замовлення */}
                        <Col md={5} className="mt-4 mt-md-0 ps-md-4">
                          <h5 className="fw-bold text-muted mb-3 small text-uppercase">Дані отримувача</h5>
                          <p className="mb-1"><strong>ПІБ:</strong> {order.customerInfo?.name || "Не вказано"}</p>
                          <p className="mb-1"><strong>Телефон:</strong> {order.customerInfo?.phone || "Не вказано"}</p>
                          <p className="mb-3"><strong>Місто:</strong> {order.customerInfo?.city || "Не вказано"}</p>
                          {order.customerInfo?.comment && (
                            <div className="p-2 bg-light rounded small text-muted">
                              <strong>Коментар:</strong> {order.customerInfo.comment}
                            </div>
                          )}
                          <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                            <span className="fs-5 fw-bold">Загальна сума:</span>
                            <span className="fs-4 fw-bold text-danger">${calculateOrderTotal(order.items)}</span>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          )}
        </Tab>

      </Tabs>
    </Container>
  );
};

export default CartPage;