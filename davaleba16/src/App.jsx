import React, { useState, useCallback, useRef } from 'react';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const taskIdRef = useRef(0);

  // Generate a unique ID for each task
  const generateTaskId = useCallback(() => {
    return ++taskIdRef.current;
  }, []);

  // Add a new task to Backlog
  const addTask = useCallback((task) => {
    const newTask = { id: generateTaskId(), text: task };
    setBacklogTasks((prevTasks) => [...prevTasks, newTask]);
  }, [generateTaskId]);

  // Move task from Backlog to In Progress
  const moveToInProgress = useCallback((id) => {
    setBacklogTasks((prevBacklog) => {
      const newBacklog = prevBacklog.filter(task => task.id !== id);
      const movedTask = prevBacklog.find(task => task.id === id);
      if (movedTask) {
        setInProgressTasks((prevInProgress) => [...prevInProgress, movedTask]);
      }
      return newBacklog;
    });
  }, []);

  // Move task from In Progress to Done
  const moveToDone = useCallback((id) => {
    setInProgressTasks((prevInProgress) => {
      const newInProgress = prevInProgress.filter(task => task.id !== id);
      const movedTask = prevInProgress.find(task => task.id === id);
      if (movedTask) {
        setCompletedTasks((prevCompleted) => [...prevCompleted, movedTask]);
      }
      return newInProgress;
    });
  }, []);

  // Move task back from In Progress to Backlog
  const moveBackToBacklog = useCallback((id) => {
    setInProgressTasks((prevInProgress) => {
      const newInProgress = prevInProgress.filter(task => task.id !== id);
      const movedTask = prevInProgress.find(task => task.id === id);
      if (movedTask) {
        setBacklogTasks((prevBacklog) => [...prevBacklog, movedTask]);
      }
      return newInProgress;
    });
  }, []);

  // Delete task from Done
  const deleteTask = useCallback((id) => {
    setCompletedTasks((prevCompleted) => {
      return prevCompleted.filter(task => task.id !== id);
    });
  }, []);

  // Move task back from Done to In Progress
  const moveBackToInProgress = useCallback((id) => {
    setCompletedTasks((prevCompleted) => {
      const newCompleted = prevCompleted.filter(task => task.id !== id);
      const movedTask = prevCompleted.find(task => task.id === id);
      if (movedTask) {
        setInProgressTasks((prevInProgress) => [...prevInProgress, movedTask]);
      }
      return newCompleted;
    });
  }, []);

  return (
    <div className="App">
      <h1>To-Do List Application</h1>
      <input
        type="text"
        placeholder="Enter new task"
        onKeyPress={(event) => {
          if (event.key === 'Enter' && event.target.value.trim()) {
            addTask(event.target.value.trim());
            event.target.value = '';
          }
        }}
      />
      <div className="columns">
        <TaskList
          title={`Backlog (${backlogTasks.length})`}
          tasks={backlogTasks}
          handleTaskAction={moveToInProgress}
          actionLabel="Start"
        />
        <TaskList
          title={`In Progress (${inProgressTasks.length})`}
          tasks={inProgressTasks}
          handleTaskAction={moveToDone}
          actionLabel="Finish"
          secondaryAction={moveBackToBacklog}
          secondaryLabel="Move Back"
        />
        <TaskList
          title={`Done (${completedTasks.length})`}
          tasks={completedTasks}
          handleTaskAction={deleteTask}
          actionLabel="Delete"
          secondaryAction={moveBackToInProgress}
          secondaryLabel="Redo"
        />
      </div>
    </div>
  );
}

export default App;







