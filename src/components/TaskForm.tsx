import React, { useState } from 'react';

const TaskForm: React.FC<{ onSubmit: (task: unknown) => void }> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority, dueDate, status: 'Pending' });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>
      <label className="block mb-2">
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>
      <label className="block mb-2">
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        ></textarea>
      </label>
      <label className="block mb-2">
        Priority:
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </label>
      <label className="block mb-2">
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded p-2"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
