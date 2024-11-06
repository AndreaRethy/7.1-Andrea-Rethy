import background from '../assets/background.jpg';
import { FaUser, FaLock, FaUserTag } from "react-icons/fa";
import { FaClipboardUser, FaUserGear, FaUserLargeSlash, FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const URL = "/api/v1/users/"

interface User {
  createdAt: string;
  id: number;
  role: "USER" | "ADMIN";
}

interface DecodedToken {
  exp: number;
  iat: number;
  user: User;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token") ?? "";
    setToken(storedToken);
    const storedUserId = sessionStorage.getItem("userId");
    setMyUserId(storedUserId ? Number(storedUserId) : null);

    if (storedToken) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(storedToken);
      console.log(decoded)
      if (decoded.user.role === "ADMIN") {
        setIsAdmin(true);
      }
    }

  }, []);

  useEffect(() => {
    if (myUserId != null) {
      getUser()
    }
  })

  function getUser() {
    fetch(`${URL}${myUserId}`, {
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
        setName(data.name)
        setUsername(data.username)
      } 
    )
      .catch((error) => console.error('Error:', error));
  }

  function updateProfile() {
    fetch(`${URL}${myUserId}`, {
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
      if (response.status === 403 || response.status === 401) {
        navigate("/");
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
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (username !== null && username.trim()) {
      updateProfile();
    } else {
      alert("Username cannot be empty");
    }
  };

  function updateUser() {
    fetch(`${URL}${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ 
        role: role,
        isBanned: isBanned,
       }),
    })
    .then((response) => {
      if (response.status === 403 || response.status === 401) {
        navigate("/");
      }
      return response.json();
    })
      .then((data) => {
        console.log(data)
          navigate("/home");
      } 
    )
      .catch((error) => console.error('Error:', error));
  }
  
  const handleUserUpdate = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (userId !== "" && userId.trim()) {
      updateUser();
    } else {
      alert("UserID has to be set");
    }
  };

  const goBack = () => {
    navigate("/home");
  }

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <section className='p-4 h-screen bg-black' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='flex flex-col h-full'>
        <FaArrowLeftLong className='text-slate-900 text-4xl z-10' onClick={goBack}/>
        <div className='flex justify-center items-center h-full z-0' >
          <div className='m-4 p-20 rounded-xl backdrop-blur-lg shadow-md shadow-slate-500'>
            <form onSubmit={handleProfileUpdate}>
              <h2 className='text-slate-900 text-5xl font-semibold my-4'>Update Profile</h2>

              {/* Name */}
              <div className='relative'>
                <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='text' placeholder='Name' required value={name} id='name' onChange={(e) => setName(e.target.value)} />
                <FaUser className='text-slate-900 absolute right-8 top-1/2 -translate-y-2/4' />
              </div>

              {/* Username */}
              <div className='relative'>
                <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='text' placeholder='Username' required value={username} id='username' onChange={(e) => setUsername(e.target.value)} />
                <FaUserTag className='text-slate-900 absolute right-8 top-1/2 -translate-y-2/4' />
              </div>

              {/* Password */}
              <div className='relative'>
                <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='password' placeholder='Password' required value={password} id='username' onChange={(e) => setPassword(e.target.value)} />
                <FaLock className='text-slate-900 absolute right-8 top-1/2 -translate-y-2/4'/>
              </div>
              <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:opacity-85'>Submit</button>
            </form>
          </div>

          { isAdmin ? (

          <div className='m-4 p-20 rounded-xl backdrop-blur-lg shadow-md shadow-slate-500'>
            <form onSubmit={handleUserUpdate}>
              <h2 className='text-slate-900 text-5xl font-semibold my-4'>Update User</h2>

              {/* ID */}
              <div className='relative'>
                <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='string' placeholder='User ID' required value={userId} id='userId' onChange={(e) => setUserId(e.target.value)} />
                <FaClipboardUser className='text-slate-900 absolute right-8 top-1/2 -translate-y-2/4' />
              </div>

              {/* Role Dropdown */}
              <div className='relative'>
                <select
                  className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none min-w-full' value={role} id='role' onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")} required >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <FaUserGear className='text-slate-900 absolute right-8 top-1/2 transform -translate-y-2/4' />
              </div>

              {/* Is Banned Dropdown */}
              <div className='relative'>
                <select
                  className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none min-w-full' value={isBanned ? "true" : "false"} id='isBanned' onChange={(e) => setIsBanned(e.target.value === "true")} required >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
                <FaUserLargeSlash className='text-slate-900 absolute right-8 top-1/2 transform -translate-y-2/4' />
              </div>
              <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:opacity-85'>Submit</button>
            </form>
          </div>
          ) : <></>}
          
        </div>
        <button className='rounded-lg text-xl font-semibold p-4 bg-slate-50 m-auto w-max' onClick={handleSignOut}>Sign Out</button>
      </div>
    </section>
  )
}

export default ProfilePage