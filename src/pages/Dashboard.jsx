
import { Link } from "react-router-dom";
import TaskList from "../componets/TaskList";

export default function Dashboard({ tasks, groups }) {
  const done = tasks.filter((t) => t.status === "Done").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const progress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  return (
    <>
      <div className="welcome">
        <div className="welcome-text">
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

          {groups.length ? (
            groups.map((group) => (
              <Link
                className="group-row"
                to={`/groups/${group.id}`}
                key={group.id}
              >
                <span className="group-symbol">▤</span>
                <span>{group.name}</span>
                <span className="group-count">
                  {tasks.filter(
                    (t) => String(t.groupId) === String(group.id)
                  ).length}
                </span>
              </Link>
            ))
          ) : (
            <p>No groups created yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
