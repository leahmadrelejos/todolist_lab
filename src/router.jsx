
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  TasksPage,
  GroupsPage,
  GroupDetail,
  GuidePage,
  DevelopersPage,
} from "./pages.jsx";

export default function AppRouter(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard tasks={props.tasks} groups={props.groups} />}
      />

      <Route
        path="/tasks"
        element={
          <TasksPage
            tasks={props.tasks}
            groups={props.groups}
            onAdd={props.addTask}
            onToggle={props.toggleTask}
            onUpdateStatus={props.updateTaskStatus}
            onDelete={props.deleteTask}
          />
        }
      />

      <Route
        path="/groups"
        element={
          <GroupsPage
            groups={props.groups}
            tasks={props.tasks}
            onCreate={props.createGroup}
            onDelete={props.deleteGroup}
          />
        }
      />

      <Route
        path="/groups/:groupId"
        element={
          <GroupDetail
            groups={props.groups}
            tasks={props.tasks}
            onAdd={props.addTask}
            onToggle={props.toggleTask}
            onUpdateStatus={props.updateTaskStatus}
            onDelete={props.deleteTask}
          />
        }
      />

      <Route path="/guide" element={<GuidePage />} />
      <Route path="/developers" element={<DevelopersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
