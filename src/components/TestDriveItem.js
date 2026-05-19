import React from 'react';
import { ListGroup, Button, Form, Badge } from 'react-bootstrap'; 

const TestDriveItem = ({ drive, onDelete, onToggle, role }) => {
  return (
    <ListGroup.Item 
      className={`d-flex justify-content-between align-items-center mb-2 border-0 shadow-sm rounded ${drive.completed ? 'bg-light' : ''}`}
      style={{ borderLeft: drive.completed ? '5px solid #6c757d' : '5px solid #dc3545' }}
    >
      <div className="d-flex align-items-center">
        <Form.Check 
          type="switch"
          id={`custom-switch-${drive.id}`} 
          checked={drive.completed} 
          // Перемикати статус дозволено тільки адміну
          onChange={() => onToggle(drive.id, drive.completed)} 
          disabled={role !== 'admin'}
          className="me-3" 
        />
        <div>
          <div className={`fw-bold ${drive.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {drive.carName} 
          </div>
          <div className="small text-secondary">
            Графік: <span className="text-dark fw-bold">{drive.date}</span> о <span className="text-dark fw-bold">{drive.time}</span> 
            {role === 'admin' && ` | Клієнт: ${drive.clientName} (${drive.userEmail})`}
          </div>
          <div className="small text-muted mt-1"> 
            Статус: {drive.completed ? <Badge bg="secondary">Завершено</Badge> : <Badge bg="success">Очікується</Badge>} 
          </div>
        </div>
      </div>
      
      {/* Клієнт може скасувати свій запис, якщо він ще не завершений */}
      {(!drive.completed || role === 'admin') && (
        <Button variant="outline-danger" size="sm" onClick={() => { if(window.confirm("Скасувати цей запис?")) onDelete(drive.id) }}> 
          Скасувати 
        </Button>
      )}
    </ListGroup.Item>
  );
};

export default TestDriveItem;