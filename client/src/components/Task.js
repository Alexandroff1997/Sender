import React from 'react';
import Button from '@mui/material/Button';
import './Task.css';

const Task = ({ text, isActive, toggleTask, id, header }) => {
  return (
    <div className="task-list">
      <div style={{display: "flex"}}>
        <div className="name-list">
          <div className="task-header">Name</div>
          <div style={{color: "yellow"}}>{header}</div>
        </div>
        <div className="description-list">
          <div className="task-description">Description</div>
          <div className={isActive ? 'task-text-active' : 'task-text-inactive'}>{text}</div>
        </div>
      </div>
      {isActive ? (
        <Button
          variant="contained"
          color="error"
          onClick={() => toggleTask(id)}
        >
          inactivate
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          onClick={() => toggleTask(id)}
        >
          activate
        </Button>
      )}
    </div>
  );
};

export default Task;
