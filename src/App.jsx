import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import CustomForm from "./component/CustomForm";
import EditForm from "./component/EditFrom";
import TaskList from "./component/TaskList";
function App() {
  const [tasks, setTasks] = useLocalStorage("react-todo.tasks", []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [PreviousFocusEl, setPreviousFocusEl] = useState(null);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((t) =>
        t.id === id ? { ...t, checked: !t.checked } : !t.checked
      )
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode();
  };
  const closeEditMode = () => {
    setIsEditing(false);
    PreviousFocusEl.focus();
  };
  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };
  return (
    <div className="container">
      <header>
        <h1 className="neon">LET'S DO V1</h1>
      </header>
      {isEditing && (
        <EditForm editedTask={editedTask} updateTask={updateTask} />
      )}

      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
      <div>
        <h5 className="footer">
          Copyright© All Reserved Rights Osama Mohamed 2023
        </h5>
      </div>
    </div>
  );
}

export default App;
