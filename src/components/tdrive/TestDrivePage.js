import React, { useState } from 'react';
import { Container, ListGroup, ButtonGroup, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTestDrives } from '../../hooks/useTestDrives';
import TestDriveItem from './TestDriveItem';
import TestDriveForm from './TestDriveForm';

const TestDrivePage = ({ cars, user, role }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  
  // Хук підтягує дані з Firestore (для адміна — всі, для юзера — власні)
  const { drives, loadingDrives, addDrive, toggleDriveStatus, deleteDrive } = useTestDrives(user, role);

  // Перевірка на гостя (якщо не авторизований)
  if (!user || role === 'guest') {
    return (
      <Container className="py-5 text-center">
        <div className="p-5 bg-white rounded shadow-sm border border-secondary-subtle">
          <h3 className="text-dark fw-bold mb-3">Потрібна авторизація</h3>
          <p className="text-muted mb-4">Щоб записатися на тест-драйв або переглянути свої записи, будь ласка, увійдіть у свій акаунт.</p>
          <Button variant="danger" size="lg" className="fw-bold px-4" onClick={() => navigate('/login')}>
            Увійти в систему
          </Button>
        </div>
      </Container>
    );
  }

  // Фільтрація записів за табами (Всі / Активні / Завершені)
  const filteredDrives = drives.filter(d => {
    if (filter === 'completed') return d.completed;
    if (filter === 'active') return !d.completed;
    return true;
  });

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-uppercase text-dark">
              {role === 'admin' ? '⚙️ Керування тест-драйвами' : '🏎️ Мій запис на тест-драйв'}
            </h2>
            <p className="text-muted">
              {role === 'admin' 
                ? 'Панель адміністратора для контролю та модерації клієнтських заявок' 
                : 'Бронювання часу для випробування автомобілів вашої мрії'}
            </p>
          </div>

          {/* ОБМЕЖЕННЯ ДОСТУПУ: 
            Форму запису показуємо ТІЛЬКИ якщо користувач НЕ є адміном.
            Адміністратор бачить виключно список для керування.
          */}
          {role !== 'admin' && (
            <TestDriveForm cars={cars} onAdd={addDrive} user={user} />
          )}
         
          {/* Контентна частина: Списки та фільтри */}
          <div className={`d-flex justify-content-between align-items-center mb-3 ${role !== 'admin' ? 'mt-5' : ''}`}>
            <h5 className="mb-0 fw-bold text-dark">
              {role === 'admin' ? 'Усі запити від клієнтів' : 'Мої заплановані поїздки'} ({filteredDrives.length})
            </h5>
            <ButtonGroup>
              <Button variant="dark" size="sm" onClick={() => setFilter('all')} active={filter === 'all'}>Всі</Button>
              <Button variant="dark" size="sm" onClick={() => setFilter('active')} active={filter === 'active'}>Активні</Button>
              <Button variant="dark" size="sm" onClick={() => setFilter('completed')} active={filter === 'completed'}>Завершені</Button>
            </ButtonGroup>
          </div>

          {loadingDrives ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
              <p className="text-muted mt-2">Синхронізація з сервером Firestore...</p>
            </div>
          ) : (
            <ListGroup variant="flush">
              {filteredDrives.length > 0 ? (
                filteredDrives.map(drive => (
                  <TestDriveItem 
                    key={drive.id} 
                    drive={drive} 
                    onDelete={deleteDrive} 
                    onToggle={toggleDriveStatus} 
                    role={role}
                  />
                ))
              ) : (
                <div className="text-center p-5 bg-white rounded shadow-sm border">
                  <p className="text-muted mb-0">
                    {role === 'admin' ? 'Нових заявок від клієнтів немає' : 'Ви ще не запланували жодного тест-драйву'}
                  </p>
                </div>
              )}
            </ListGroup>
          )}
          
        </Col>
      </Row>
    </Container>
  );
};

export default TestDrivePage;