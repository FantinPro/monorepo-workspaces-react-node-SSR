import React, {useEffect, useState} from "react";

export const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then(response => {
      return response.json();
    }).then(newUsers => {
      setUsers(newUsers);
    }).catch(() => {
      setUsers([]);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
