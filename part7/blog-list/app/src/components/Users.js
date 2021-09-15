import React from "react";

const Users = ({ users }) => {
  return (
    <table style={{ border: "none" }}>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users !== null && users !== undefined && users.length > 0
          ? users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default Users;
