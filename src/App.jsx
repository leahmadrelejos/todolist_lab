
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
        id: Date.now(),
        title: task.title,
        description: task.description || "",
        groupId: task.groupId || "",
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
              status:
                task.status === "Done" ? "Pending" : "Done",
            }
          : task
      )
    );
  }

  function updateTaskStatus(id, status) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function createGroup(name) {
    if (!name.trim()) return;

    setGroups((prev) => [
      ...prev,
      { id: Date.now(), name: name.trim() },
    ]);
  }

  function deleteGroup(id) {
    setGroups((prev) => prev.filter((group) => group.id !== id));
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">Taskly<span>.</span></h2>
        <p className="menu-label">MENU</p>

        <nav className="navigation">
          <NavLink to="/">▦ Dashboard</NavLink>
          <NavLink to="/tasks">☑ To-Do List</NavLink>
          <NavLink to="/groups">▤ Task Groups</NavLink>
          <NavLink to="/guide">ⓘ User Guide</NavLink>
          <NavLink to="/developers">♙ Developers</NavLink>
        </nav>

        <div className="sidebar-bottom">
          <span>Stay organized.</span>
          <small>Make every day productive.</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h2>My Workspace</h2>
          </div>
          <div className="profile">
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
