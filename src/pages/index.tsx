import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  assignedTo: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
    assignedTo: "",
  });

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setTasks(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    if (response.ok) {
      void fetchTasks();
      setNewTask({
        id: "",
        title: "",
        description: "",
        priority: "Low",
        deadline: "",
        assignedTo: "",
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (response.ok) {
      void fetchTasks();
    }
  };

  useEffect(() => {
    void fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Task Management Interface</h1>

      {/* Task Creation Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create a New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            name="deadline"
            value={newTask.deadline}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={newTask.assignedTo}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mt-2"
        ></textarea>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Task List</h2>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>
                <p>
                  <strong>Deadline:</strong> {task.deadline}
                </p>
                <p>
                  <strong>Assigned To:</strong> {task.assignedTo}
                </p>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
