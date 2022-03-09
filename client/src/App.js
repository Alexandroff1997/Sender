import React, { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import axios from 'axios';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios.get('/api').then(
      (result) => {
        setTaskList(result.data.result);
        setIsLoaded(true);
        console.log(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  const toggleTask = (id) => {
    setTaskList(
      taskList.map((el) => {
        if (el._id === id) {
          return { ...el, isActive: !el.isActive };
        } else {
          return el;
        }
      })
    );
    console.log(taskList);
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading</div>;
  }

  const sendTasks = async () => {
    console.log(taskList);
    await axios.post('/api', { tasks: taskList });
    alert('Tasks sent, check your mail');
  };

  return (
    <div className="app">
      <div className="app-container">
        <header>Task List: {taskList.length}</header>
        <div>
          {taskList.map((task) => {
            return (
              <Task
                header={task.header}
                toggleTask={toggleTask}
                text={task.description}
                isActive={task.isActive}
                key={task._id}
                id={task._id}
              />
            );
          })}
        </div>
        <button className="app-button" onClick={sendTasks}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
