import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
}

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div className="task-list">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border mb-2 rounded shadow">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
