
import { useState } from "react";
import TaskForm from "../componets/TaskForm";
import TaskList from "../componets/TaskList";

export default function TasksPage({
  tasks,
  groups,
  onAdd,
  onToggle,
  onUpdateStatus,
  onDelete,
}) {
  const [filter, setFilter] = useState("All");

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <>
      <div className="welcome">
        <div className="welcome-text">
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
