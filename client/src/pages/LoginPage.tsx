import background from '../assets/background.jpg'
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const URL = "/api/v1/login";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function checkUser(name: string, password: string) {
    fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: name, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        if (data.isBanned) {
          alert("This user is banned");
          return;
        }
        
        if (data.accessToken) {
          sessionStorage.setItem("userId", data.id.toString());
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("token", data.accessToken);
          navigate("/home");
        } else {
          alert("Invalid user! Try again");
        }
      })
      .catch((error) => alert(`Error: ${error}`));
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      checkUser(username, password);
    } else {
      alert("Username and Password are mandatory fields");
    }
  };

  return (
    <section className='flex justify-center items-center min-h-full bg-slate-400' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='m-4 p-20 rounded-xl backdrop-blur-lg shadow-md shadow-slate-500'>
        <form onSubmit={handleLogin}>
          <h1 className='text-slate-900 text-5xl font-semibold my-4'>Login</h1>
          <div className='relative'>
            <input className='w-full rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='text' placeholder='Username' required value={username} id='username' onChange={(e) => setUsername(e.target.value)} autoComplete='off' />
            <FaUser className='text-slate-900 absolute right-4 top-1/2 -translate-y-2/4'/>
          </div>
          <div className='relative'>
            <input className='w-full rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 opacity-70 appearance-none' type='password' placeholder='Password' required value={password} id='password' onChange={(e) => setPassword(e.target.value)} />
            <FaLock className='text-slate-900 absolute right-4 top-1/2 -translate-y-2/4'/>
          </div>
          <div className='flex justify-between'>
            {/* <div className='flex items-center justify-evenly'>
              <input type='checkbox' placeholder='Password' required id='remember' className='accent-white mr-1 w-5 h-5'/>
              <label htmlFor="remember" className='text-white'>Remember me</label>
            </div> */}
            <a href='#' className='text-slate-900 underline underline-offset-2 hover:text-slate-300'>Forgot password?</a>
          </div>
          <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:opacity-85'>Login</button>
          
          <p className='text-slate-900'>Don't have an account? <Link to={"/register"} className='underline underline-offset-2 hover:text-slate-300 font-semibold'>Register</Link></p>
          
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
