import React from "react";
import { users } from "../data/demoData";
import "../Styles/Users.css"

function Users() {
  return (
    <div>
      <h2>Users</h2>

      {users.map(u => (
        <p key={u.id}>
          {u.name} — {u.role}
        </p>
      ))}
    </div>
  );
}

export default Users;
