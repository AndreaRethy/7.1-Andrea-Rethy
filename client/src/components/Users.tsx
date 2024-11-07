/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/v1/users";

export type User = {
  id: number;
  username: string;
  name: string;
  role: "USER" | "ADMIN";
  isBanned: boolean;
}

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers ] = useState<User[]>([])
  const [token, setToken] = useState<string | null>(null);

  const onWindowLoad = () => {
    getUsers();
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      onWindowLoad();
    }
  }, [token]);

  function getUsers() {
    fetch(`${URL}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((response) => {
      if (response.status === 403 || response.status === 401) {
        navigate("/");
      }
      return response.json();
    })
      .then((data) => {
        setUsers(data)
      } 
    )
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="p-10 flex flex-col justify-start align-top items-start">
      <h2 className="text-slate-800 text-2xl font-bold pb-4">List of All Users</h2>
      <ul className="flex flex-col justify-start align-top items-start">
      <li key={0} className="text-slate-800 font-semibold pb-2">ID - Name - Username - Role</li>
        {
          users.map((user, index) => {
            return (
              <li key={index + 1} className="text-slate-800">{user.id} - {user.name} - {user.username} - {user.role}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Users;
