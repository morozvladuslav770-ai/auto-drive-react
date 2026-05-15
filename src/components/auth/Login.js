import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Ви успішно увійшли!");
      navigate('/');
    } catch (error) {
      alert("Помилка входу: Перевірте email та пароль. (" + error.message + ")");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: '400px' }} className="p-4 shadow border-0">
        <h2 className="text-center fw-bold mb-4 text-dark">Вхід</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Введіть email" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Пароль</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Введіть пароль" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100 fw-bold mb-3">Увійти</Button>
          
          <div className="text-center mt-3">
            <span className="text-muted">Немає акаунту? </span>
            <NavLink to="/register" className="text-danger fw-bold text-decoration-none">
              Зареєструватись
            </NavLink>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;