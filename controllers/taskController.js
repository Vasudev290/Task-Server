import Task from "../model/Task.js";

//Read
const getTasks = async (req, res) => {
  try {
    const { filter } = req.query;
    const query = {}; // No user filter

    if (filter === "completed") {
      query.completed = true;
    } else if (filter === "pending") {
      query.completed = false;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Getting all the Tasks", Tasks: tasks.length, tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};


//Create
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({ title }); 
    res.status(201).json({ message: "New Task as created successfull!", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

//Update
const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!tasks) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfull!", tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

//Delete
const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findByIdAndDelete(id);
    if (!tasks) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task Deleted successfull!", tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

export { getTasks, createTask, updateTasks, deleteTasks };
