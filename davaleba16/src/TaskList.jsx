import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ title, tasks, handleTaskAction, actionLabel, secondaryAction, secondaryLabel }) {
  return (
    <div className="task-list">
      <h2>{title}</h2>
      <div className="divider"></div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}  // Ensure this is unique
            task={task}
            handleAction={() => handleTaskAction(task.id)}
            actionLabel={actionLabel}
            handleSecondaryAction={secondaryAction ? () => secondaryAction(task.id) : null}
            secondaryLabel={secondaryLabel}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;




