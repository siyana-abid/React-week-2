
import { useState, useEffect, useCallback, memo } from "react";

// 1. HOC: Log component renders
function withRenderLogger(Component) {
  return function LoggedComponent(props) {
    console.log(Component.name + " rendered");
    return <Component {...props} />;
  };
}

// 2. TodoItem: Memoization
const TodoItem = memo(function TodoItem({ task, onDelete }) {
  console.log("TodoItem rendered:", task.id);

  return (
    <li>
      {task.text}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
});

// 3. TodoList component
function TodoList() {
  const [taskText, setTaskText] = useState("");

  // Load saved tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a task
  function addTask() {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText("");
  }

  // Keep the delete function reference stable
  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }, []);

  return (
    <div>
      <h1>My Todo List</h1>

      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

// Apply HOC
const TodoListWithLogger = withRenderLogger(TodoList);

function App() {
  return <TodoListWithLogger />;
}

export default App;
