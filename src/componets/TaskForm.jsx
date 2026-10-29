
import { useState } from "react";

export default function TaskForm({
  groups,
  onAdd,
  defaultGroup = "",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState(String(defaultGroup));

  function submit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      groupId,
    });

    setTitle("");
    setDescription("");
    setGroupId(String(defaultGroup));
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <label>Task Title</label>
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
        rows={3}
      />

      <label>Task Group</label>
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
