
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AppRouter from "./router.jsx";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([
    { id: 1, name: "Personal" },
    { id: 2, name: "School" },
    { id: 3, name: "Work" },
  ]);

  function addTask(task) {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now(),
        status: "Pending",
        createdAt: new Date().toLocaleDateString(),
      },
    ]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Done" ? "Pending" : "Done",
            }
          : task
      )
    );
  }

  function updateTaskStatus(id, status) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function createGroup(name) {
    if (name.trim()) {
      setGroups((prev) => [
        ...prev,
        { id: Date.now(), name: name.trim() },
      ]);
    }
  }

  function deleteGroup(id) {
    setGroups((prev) => prev.filter((group) => group.id !== id));
  }

  const menu = [
    { to: "/", label: "▦ Dashboard" },
    { to: "/tasks", label: "☑ To-Do List" },
    { to: "/groups", label: "▤ Task Groups" },
    { to: "/guide", label: "ⓘ User Guide" },
    { to: "/developers", label: "♙ Developers" },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">Taskly<span>.</span></h2>
        <p className="menu-label">MENU</p>

        <nav className="sidebar-nav">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>Stay organized.</span>
          <p>Make every day productive.</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p>YOUR PERSONAL WORKSPACE</p>
            <h2>My Workspace</h2>
          </div>

          <div className="account">
            <div className="avatar">U</div>
            <span>My Account</span>
          </div>
        </header>

        <section className="page-content">
          <AppRouter
            tasks={tasks}
            groups={groups}
            addTask={addTask}
            toggleTask={toggleTask}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
            createGroup={createGroup}
            deleteGroup={deleteGroup}
          />
        </section>
      </main>
    </div>
  );
}
