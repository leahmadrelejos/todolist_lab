
import { useState } from "react";
import { Link } from "react-router-dom";

export default function GroupsPage({
  groups,
  tasks,
  onCreate,
  onDelete,
}) {
  const [name, setName] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate(name.trim());
    setName("");
  }

  return (
    <>
      <div className="welcome">
        <div className="welcome-text">
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
          <button className="primary-btn" type="submit">
            + Add Group
          </button>
        </form>
      </section>

      <div className="groups-grid">
        {groups.map((group) => (
          <article className="group-card" key={group.id}>
            <span className="group-symbol">▤</span>
            <h2>{group.name}</h2>

            <p>
              {tasks.filter(
                (t) => String(t.groupId) === String(group.id)
              ).length}{" "}
              tasks
            </p>

            <div className="group-actions">
              <Link to={`/groups/${group.id}`}>
                Open group →
              </Link>
              <button
                className="delete-btn"
                type="button"
                onClick={() => onDelete(group.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
