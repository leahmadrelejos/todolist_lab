
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import GroupsPage from "./pages/GroupsPage";
import GroupDetail from "./pages/GroupDetail";
import GuidePage from "./pages/GuidePage";
import DevelopersPage from "./pages/DevelopersPage";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function AppContent() {
  const [tasks, setTasks] = useState(() =>
    readStorage("taskly-tasks", [])
  );

  const [groups, setGroups] = useState(() =>
    readStorage("taskly-groups", [])
  );

  useEffect(() => {
    localStorage.setItem("taskly-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskly-groups", JSON.stringify(groups));
  }, [groups]);

  function addTask(data) {
    const task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: data.title,
      description: data.description,
      groupId: data.groupId,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    setTasks((previous) => [...previous, task]);
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
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
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  function createGroup(name) {
    const group = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
    };

    setGroups((previous) => [...previous, group]);
  }

  function deleteGroup(id) {
    setGroups((previous) =>
      previous.filter((group) => group.id !== id)
    );

    setTasks((previous) =>
      previous.map((task) =>
        String(task.groupId) === String(id)
          ? { ...task, groupId: "" }
          : task
      )
    );
  }

  const taskProps = {
    tasks,
    groups,
    onAdd: addTask,
    onToggle: toggleTask,
    onUpdateStatus: updateTaskStatus,
    onDelete: deleteTask,
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand">
          <span className="brand-icon">✓</span>
          <span>Taskly</span>
        </NavLink>

        <p className="nav-label">WORKSPACE</p>

        <nav className="navigation">
          <NavLink to="/" end className="nav-link">
            <span>▦</span> Dashboard
          </NavLink>

          <NavLink to="/tasks" className="nav-link">
            <span>☑</span> To-Do List
          </NavLink>

          <NavLink to="/groups" className="nav-link">
            <span>▤</span> Task Groups
          </NavLink>
        </nav>

        <p className="nav-label">SUPPORT</p>

        <nav className="navigation">
          <NavLink to="/guide" className="nav-link">
            <span>ⓘ</span> User Guide
          </NavLink>

          <NavLink to="/developers" className="nav-link">
            <span>♙</span> Developers
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-avatar">T</div>
          <div>
            <strong>Taskly User</strong>
            <small>Personal Workspace</small>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <span className="topbar-label">MY WORKSPACE</span>
            <h2>Task Management</h2>
          </div>
          <div className="topbar-badge">
            <span className="online-dot" />
            All changes saved
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard tasks={tasks} groups={groups} />}
            />

            <Route
              path="/tasks"
              element={<TasksPage {...taskProps} />}
            />

            <Route
              path="/groups"
              element={
                <GroupsPage
                  groups={groups}
                  tasks={tasks}
                  onCreate={createGroup}
                  onDelete={deleteGroup}
                />
              }
            />

            <Route
              path="/groups/:groupId"
              element={<GroupDetail {...taskProps} />}
            />

            <Route path="/guide" element={<GuidePage />} />

            <Route
              path="/developers"
              element={<DevelopersPage />}
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
