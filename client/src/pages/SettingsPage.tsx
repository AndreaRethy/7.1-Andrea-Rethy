import background from '../assets/background.jpg';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const URL = "/api/v1/users/"
//const URLAdmin = "/api/v1/users/"

const ProfilePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setuserId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setuserId(Number(sessionStorage.getItem("userId")));
  }, [token, userId]);

  function updateUser() {
    fetch(`${URL}${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ 
        username: username,
        password: password,
        name: name
       }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          if (response.status === 403 && errorData.error === "Invalid token") {
            navigate("/");
          } else {
            throw new Error(errorData.error || 'An error occured');
          }
        });
      }
      return response.json();
    })
      .then((data) => {
        console.log(data)
         if (data.name !== "") {
          sessionStorage.setItem("username", data.name);
          navigate("/home");
          alert("User successfully updated!")
        } else {
          alert("Invalid user! Try again")
        }
      } 
    )
      .catch((error) => console.error('Error:', error));
  }
  
  const handleUpdate = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (username !== null && username.trim()) {
      updateUser();
    } else {
      alert("Username cannot be empty");
    }
  };

  return (
    <section className='flex justify-center items-center min-h-full bg-black' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='m-4 p-20 rounded-xl backdrop-blur-lg shadow-md shadow-slate-500'>
        <form onSubmit={handleUpdate}>
          <h1 className='text-slate-900 text-5xl font-semibold my-4'>Create Account</h1>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='text' placeholder='Name' required value={name} id='name' onChange={(e) => setName(e.target.value)} />
            <FaUser className='text-slate-900 absolute right-8 top-1/2 -translate-y-2/4' />
          </div>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='text' placeholder='Username' required value={username} id='username' onChange={(e) => setUsername(e.target.value)} />
            <FaUser className='text-slate-900 absolute right-8 top-1/2 -translate-y-2/4' />
          </div>
          <div className='relative'>
            <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='password' placeholder='Password' required value={password} id='username' onChange={(e) => setPassword(e.target.value)} />
            <FaLock className='text-slate-900 absolute right-8 top-1/2 -translate-y-2/4'/>
          </div>
          <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:opacity-85'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default ProfilePage