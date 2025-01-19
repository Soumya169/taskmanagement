import { type NextApiRequest, type NextApiResponse } from "next";

// Mock data for tasks and assigned work
let tasks = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create a responsive homepage design",
    priority: "High",
    deadline: "2025-01-30",
    assignedTo: "Alice",
  },
];

let work = [
  {
    id: "w1",
    taskId: "1",
    description: "Prepare wireframe for homepage",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newTask = { id: `${Date.now()}`, ...req.body };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    // Delete the task
    tasks = tasks.filter((task) => task.id !== id);

    // Delete associated work
    work = work.filter((w) => w.taskId !== id);

    res.status(200).json({ success: true, message: "Task and associated work deleted successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
