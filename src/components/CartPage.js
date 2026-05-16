import React from 'react';
import { Container, Card, Button, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, user, removeFromCart, createOrder }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, car) => {
      const priceNum = Number(car.price.replace(/[^0-9]/g, ''));
      return total + priceNum;
    }, 0).toLocaleString();
  };

  const handleFinish = async () => {
    if (cart.length === 0) return;
    const success = await createOrder(user);
    if (success) {
      alert("Дякуємо! Ваша заявка на купівлю прийнята. Менеджер зв'яжеться з вами.");
      navigate('/');
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center mb-5 border-bottom pb-3 border-danger border-3">
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
          <Col lg={8}>
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

          {/* Панель підсумку */}
          <Col lg={4}>
            <Card className="border-0 shadow-lg p-4 bg-dark text-white rounded-4 sticky-top" style={{ top: '100px' }}>
              <h3 className="fw-bold mb-4 border-bottom border-secondary pb-3">Підсумок</h3>
              
              <ListGroup variant="flush" className="bg-transparent mb-4">
                <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between border-secondary px-0">
                  <span>Кількість:</span>
                  <strong>{cart.length} шт.</strong>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white d-flex justify-content-between border-secondary px-0 fs-5">
                  <span>До сплати:</span>
                  <strong className="text-danger">${calculateTotal()}</strong>
                </ListGroup.Item>
              </ListGroup>

              <div className="bg-secondary bg-opacity-25 p-3 rounded mb-4 small">
                <p className="mb-0 text-light opacity-75">
                  * Натискаючи "Оформити", ви підтверджуєте бронювання автомобілів. Наш менеджер перевірить наявність та зателефонує вам.
                </p>
              </div>

              <Button 
                variant="danger" 
                size="lg" 
                className="w-100 py-3 fw-bold text-uppercase shadow" 
                onClick={handleFinish}
              >
                Оформити замовлення
              </Button>
              
              <Button 
                variant="outline-light" 
                className="w-100 mt-3 border-0 opacity-75"
                onClick={() => navigate('/catalog')}
              >
                Продовжити покупки
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;