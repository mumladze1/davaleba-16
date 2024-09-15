import React from 'react';

function TaskItem({ task, handleAction, actionLabel, handleSecondaryAction, secondaryLabel }) {
  // Generate a random border color
  const borderColor = React.useMemo(() => {
    const colors = ['red', 'blue', 'yellow', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []); // Remove task.id from dependencies

  return (
    <div className="task-item" style={{ borderColor }}>
      <span>{task.text}</span>
      <button onClick={handleAction}>{actionLabel}</button>
      {handleSecondaryAction && (
        <button onClick={handleSecondaryAction}>{secondaryLabel}</button>
      )}
    </div>
  );
}

export default TaskItem;




