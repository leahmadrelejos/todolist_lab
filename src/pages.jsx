
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function TaskForm({ groups, onAdd, defaultGroup = "" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState(String(defaultGroup));

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title: title.trim(), description, groupId });
    setTitle("");
    setDescription("");
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <label>Task title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What do you need to do?"
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add task details..."
        rows="3"
      />

      <label>Task group</label>
      <select
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
      >
        <option value="">No group</option>
        {groups.map((group) => (
          <option key={group.id} value={String(group.id)}>
            {group.name}
          </option>
        ))}
      </select>

      <button className="primary-btn" type="submit">
        + Add Task
      </button>
    </form>
  );
}

function TaskList({ tasks, onToggle, onUpdateStatus, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <h3>No tasks yet</h3>
        <p>Add a task to get started.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-card" key={task.id}>
          <button
            className={`check-btn ${task.status === "Done" ? "checked" : ""}`}
            onClick={() => onToggle(task.id)}
            aria-label="Toggle task completion"
            type="button"
          >
            {task.status === "Done" ? "✓" : ""}
          </button>

          <div className="task-info">
            <h3 className={task.status === "Done" ? "completed" : ""}>
              {task.title}
            </h3>
            {task.description && <p>{task.description}</p>}
            <small>Created: {task.createdAt}</small>
          </div>

          <select
            className={`status-select status-${task.status.toLowerCase().replace(" ", "-")}`}
            value={task.status}
            onChange={(e) => onUpdateStatus(task.id, e.target.value)}
            aria-label={`Status for ${task.title}`}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button
            className="delete-btn"
            onClick={() => onDelete(task.id)}
            type="button"
            aria-label="Delete task"
          >
            ✕
          </button>
        </article>
      ))}
    </div>
  );
}

export function Dashboard({ tasks, groups }) {
  const done = tasks.filter((task) => task.status === "Done").length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const progress = tasks.filter((task) => task.status === "In Progress").length;

  return (
    <>
      <div className="welcome">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Organize your tasks and make today productive.</p>
        </div>
        <Link className="primary-btn link-btn" to="/tasks">
          + Create Task
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon purple">▤</span>
          <p>Total Tasks</p>
          <h2>{tasks.length}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-icon orange">◷</span>
          <p>Pending</p>
          <h2>{pending}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-icon blue">↻</span>
          <p>In Progress</p>
          <h2>{progress}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-icon green">✓</span>
          <p>Completed</p>
          <h2>{done}</h2>
        </div>
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Tasks</h2>
              <p>Your latest activities</p>
            </div>
            <Link to="/tasks">View all →</Link>
          </div>
          <TaskList
            tasks={tasks.slice(-4).reverse()}
            onToggle={() => {}}
            onUpdateStatus={() => {}}
            onDelete={() => {}}
          />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Task Groups</h2>
              <p>Organize tasks by category</p>
            </div>
            <Link to="/groups">View all →</Link>
          </div>

          {groups.length ? groups.map((group) => (
            <Link
              className="group-row"
              to={`/groups/${group.id}`}
              key={group.id}
            >
              <span className="group-symbol">▤</span>
              <span>{group.name}</span>
              <span className="group-count">
                {tasks.filter((task) => String(task.groupId) === String(group.id)).length}
              </span>
            </Link>
          )) : <p>No groups created yet.</p>}
        </section>
      </div>
    </>
  );
}

export function TasksPage({ tasks, groups, onAdd, onToggle, onUpdateStatus, onDelete }) {
  const [filter, setFilter] = useState("All");

  const filteredTasks = filter === "All"
    ? tasks
    : tasks.filter((task) => task.status === filter);

  return (
    <>
      <div className="welcome">
        <div>
          <p className="eyebrow">YOUR WORK</p>
          <h1>To-Do List</h1>
          <p>Manage your tasks in one place.</p>
        </div>
      </div>

      <div className="content-grid task-page-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>My Tasks</h2>
              <p>{filteredTasks.length} task(s)</p>
            </div>
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <TaskList
            tasks={[...filteredTasks].reverse()}
            onToggle={onToggle}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Add New Task</h2>
              <p>Enter your task details</p>
            </div>
          </div>
          <TaskForm groups={groups} onAdd={onAdd} />
        </section>
      </div>
    </>
  );
}

export function GroupsPage({ groups, tasks, onCreate, onDelete }) {
  const [name, setName] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name);
    setName("");
  }

  return (
    <>
      <div className="welcome">
        <div>
          <p className="eyebrow">CATEGORIES</p>
          <h1>Task Groups</h1>
          <p>Keep related tasks together.</p>
        </div>
      </div>

      <section className="panel">
        <h2>Create a Group</h2>
        <form className="inline-form" onSubmit={submit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter group name"
            required
          />
          <button className="primary-btn">+ Add Group</button>
        </form>
      </section>

      <div className="groups-grid">
        {groups.map((group) => (
          <article className="group-card" key={group.id}>
            <span className="group-symbol">▤</span>
            <h2>{group.name}</h2>
            <p>
              {tasks.filter((task) => String(task.groupId) === String(group.id)).length} tasks
            </p>
            <div className="group-actions">
              <Link to={`/groups/${group.id}`}>Open group →</Link>
              <button className="delete-btn" onClick={() => onDelete(group.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function GroupDetail({ groups, tasks, onAdd, onToggle, onUpdateStatus, onDelete }) {
  const { groupId } = useParams();
  const group = groups.find((item) => String(item.id) === groupId);
  const groupTasks = tasks.filter((task) => String(task.groupId) === groupId);

  if (!group) {
    return (
      <section className="panel">
        <h2>Group not found</h2>
        <Link to="/groups">Back to groups</Link>
      </section>
    );
  }

  return (
    <>
      <div className="welcome">
        <div>
          <p className="eyebrow">TASK GROUP</p>
          <h1>{group.name}</h1>
          <p>Tasks organized in this group.</p>
        </div>
        <Link className="secondary-btn" to="/groups">← Back</Link>
      </div>

      <div className="content-grid task-page-grid">
        <section className="panel">
          <h2>Group Tasks</h2>
          <TaskList
            tasks={groupTasks}
            onToggle={onToggle}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        </section>
        <section className="panel">
          <h2>Add a Task</h2>
          <TaskForm groups={groups} onAdd={onAdd} defaultGroup={group.id} />
        </section>
      </div>
    </>
  );
}

export function GuidePage() {
  return (
    <section className="panel">
      <p className="eyebrow">HELP CENTER</p>
      <h1>User Guide</h1>
      <ol className="guide-list">
        <li>Open To-Do List to add a task.</li>
        <li>Enter a title, optional description, and group.</li>
        <li>Change the status to Pending, In Progress, or Done.</li>
        <li>Use Task Groups to organize related tasks.</li>
        <li>Delete tasks or groups you no longer need.</li>
      </ol>
    </section>
  );
}

export function DevelopersPage() {
  return (
    <section className="panel">
      <p className="eyebrow">ABOUT THE PROJECT</p>
      <h1>Developers</h1>
      <p>Taskly is a simple task management website created using React.</p>
      <p>Technology used: React, React Router, Vite, and CSS.</p>
    </section>
  );
}
