import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {storetokenInLs} = useAuth()

  // Handle input change dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handle_forgetPass = ()=>{
    navigate("/forget")
  }

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
try {
  const response = await fetch('https://real-state-backend-uvau.onrender.com/login',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)

  })
  console.log("login form", response)
  if(response.ok){
    const res_data = await response.json()
    console.log("response from server", res_data.token)

    storetokenInLs(res_data.token)
    alert("login successful")
    setUser({email:"",password:""})
    navigate("/usertable");

  }else{
    alert("user not exists")
  }



} catch (error) {
  console.log("login error",error)
}
   
    
  };

  return (
    <div className="w-screen flex justify-center items-center min-h-screen text-black bg-[#F8EFE2]">
      <div className="w-[90%] sm:w-[400px] p-8 bg-white shadow-2xl rounded-2xl text-center">
        <h2 className="text-3xl font-bold text-[#181d24]">Login</h2>
        <p className="text-gray-600 mt-2">Welcome back! Please login to continue.</p>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <form className="mt-6 text-left" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#FFB400] focus:outline-none"
                value={user.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#FFB400] focus:outline-none"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full btn2 text-black font-bold py-3 rounded-lg hover:bg-[#D99C00] transition"
          >
            Login
          </button>
        </form>

        {/* Signup / Forgot Password */}
        <div className="mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup"><span className="text-[#FFB400] cursor-pointer hover:underline">Sign Up</span></Link>
          </p>
          <p className="text-gray-600 mt-2">
            <span className="text-[#FFB400] cursor-pointer hover:underline" onClick={handle_forgetPass}>Forgot Password?</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
