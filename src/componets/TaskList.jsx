
export default function TaskList({
  tasks,
  onToggle,
  onUpdateStatus,
  onDelete,
}) {
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
            type="button"
            className={`check-btn ${
              task.status === "Done" ? "checked" : ""
            }`}
            onClick={() => onToggle(task.id)}
            aria-label="Toggle task completion"
          >
            {task.status === "Done" ? "✓" : ""}
          </button>

          <div className="task-info">
            <h3
              className={
                task.status === "Done" ? "completed" : ""
              }
            >
              {task.title}
            </h3>

            {task.description && <p>{task.description}</p>}

            <small>Created: {task.createdAt}</small>
          </div>

          <select
            className={`status-select status-${task.status
              .toLowerCase()
              .replace(" ", "-")}`}
            value={task.status}
            onChange={(e) =>
              onUpdateStatus(task.id, e.target.value)
            }
            aria-label={`Status for ${task.title}`}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            ✕
          </button>
        </article>
      ))}
    </div>
  );
}
