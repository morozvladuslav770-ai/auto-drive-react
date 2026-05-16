import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-banner text-white d-flex align-items-center mb-4 mb-md-5">
        <Container>
          <Row>
            <Col lg={7} className="py-4 py-md-5 text-center text-sm-start">
              <h1 className="display-4 display-md-2 fw-bold mb-3">
                Відчуй справжню <span className="text-danger">потужність</span>
              </h1>
              <p className="lead fs-5 fs-md-4 mb-4 opacity-75">
                Проєкт "AutoDrive" — ваш провідник у світ преміальних автомобілів та незабутніх вражень від драйву.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-sm-start">
                <Button as={NavLink} to="/catalog" variant="danger" size="lg" className="px-4 py-3 fw-bold shadow w-100 w-sm-auto">
                  Відкрити каталог
                </Button>
                <Button as={NavLink} to="/drive" variant="outline-light" size="lg" className="px-4 py-3 fw-bold w-100 w-sm-auto">
                  Мої записи
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="mb-4 mb-md-5 text-center">
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-2 p-md-3 custom-card-hover">
              <Card.Body>
                <div className="display-5 text-danger mb-3">🏎️</div>
                <Card.Title className="fw-bold text-uppercase fs-5 fs-md-4">Топ Моделі</Card.Title>
                <Card.Text className="text-muted small csv-text">
                  Від BMW M5 до Porsche 911 — у нас зібрані лише легенди автопрому.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-2 p-md-3 custom-card-hover">
              <Card.Body>
                <div className="display-5 text-danger mb-3">⚡</div>
                <Card.Title className="fw-bold text-uppercase fs-5 fs-md-4">Швидкий запис</Card.Title>
                <Card.Text className="text-muted small csv-text">
                  Зручна система адміністрування дозволяє забронювати тест-драйв за лічені секунди.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-2 p-md-3 custom-card-hover">
              <Card.Body>
                <div className="display-5 text-danger mb-3">🛠️</div>
                <Card.Title className="fw-bold text-uppercase fs-5 fs-md-4">Технології</Card.Title>
                <Card.Text className="text-muted small csv-text">
                  Побудовано на React 18 з використанням React Router та LocalStorage.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="bg-dark text-white p-4 p-md-5 rounded-4 shadow-lg mb-5 text-center text-md-start">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold fs-3 fs-md-2">Готові сісти за кермо?</h2>
              <p className="mb-0 opacity-75 small csv-text">Оберіть автомобіль у каталозі та залиште заявку на тест-драйв прямо зараз.</p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;