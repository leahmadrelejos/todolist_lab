
import { Link, useParams } from "react-router-dom";
import TaskForm from "../componets/TaskForm";
import TaskList from "../componets/TaskList";

export default function GroupDetail({
  groups,
  tasks,
  onAdd,
  onToggle,
  onUpdateStatus,
  onDelete,
}) {
  const { groupId } = useParams();

  const group = groups.find(
    (g) => String(g.id) === groupId
  );

  const groupTasks = tasks.filter(
    (t) => String(t.groupId) === groupId
  );

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
        <div className="welcome-text">
          <p className="eyebrow">TASK GROUP</p>
          <h1>{group.name}</h1>
          <p>Tasks organized in this group.</p>
        </div>

        <Link className="secondary-btn" to="/groups">
          ← Back
        </Link>
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
          <TaskForm
            groups={groups}
            onAdd={onAdd}
            defaultGroup={group.id}
          />
        </section>
      </div>
    </>
  );
}
