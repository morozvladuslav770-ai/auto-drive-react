import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-banner text-white d-flex align-items-center mb-5">
        <Container>
          <Row>
            <Col lg={7} className="py-5">
              <h1 className="display-2 fw-bold mb-3">
                Відчуй справжню <span className="text-danger">потужність</span>
              </h1>
              <p className="lead fs-4 mb-4 opacity-75">
                "AutoDrive" — ваш провідник у світ преміальних автомобілів та незабутніх вражень від драйву.
              </p>
              <div className="d-flex gap-3">
                <Button as={NavLink} to="/catalog" variant="danger" size="lg" className="px-4 py-3 fw-bold shadow">
                  Відкрити каталог
                </Button>
                <Button as={NavLink} to="/drive" variant="outline-light" size="lg" className="px-4 py-3 fw-bold">
                  Мої записи
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="mb-5 text-center">
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3 custom-card-hover">
              <Card.Body>
                <div className="display-5 text-danger mb-3">🏎️</div>
                <Card.Title className="fw-bold text-uppercase">Топ Моделі</Card.Title>
                <Card.Text className="text-muted">
                  Від BMW M5 до Porsche 911 — у нас зібрані лише легенди автопрому.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3 custom-card-hover">
              <Card.Body>
                <div className="display-5 text-danger mb-3">⚡</div>
                <Card.Title className="fw-bold text-uppercase">Швидкий запис</Card.Title>
                <Card.Text className="text-muted">
                  Зручна система адміністрування дозволяє забронювати тест-драйв за лічені секунди.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3 custom-card-hover">
              <Card.Body>
                <div className="display-5 text-danger mb-3">🛠️</div>
                <Card.Title className="fw-bold text-uppercase">Технології</Card.Title>
                <Card.Text className="text-muted">
                  Побудовано на React 18 з використанням React Router та LocalStorage.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="bg-dark text-white p-5 rounded-4 shadow-lg mb-5">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold">Готові сісти за кермо?</h2>
              <p className="mb-0 opacity-75">Оберіть автомобіль у каталозі та залиште заявку на тест-драйв прямо зараз.</p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;