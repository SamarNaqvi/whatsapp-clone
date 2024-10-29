import React from "react";

function UserList({ users }: { users: any }) {
  return (
    <ul className="p-3">
      {users.map((user: any) => {
        return <li className="p-2 hover:bg-purple-700">{user.name}</li>;
      })}
    </ul>
  );
}

export default UserList;
