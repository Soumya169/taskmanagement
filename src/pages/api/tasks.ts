import { type NextApiRequest, type NextApiResponse } from "next";

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
    tasks = tasks.filter((task) => task.id !== id);
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
