import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";



const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: "",
    password: ""
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

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, number, password } = user;

    if (!username || !email || !password || !number) {
      setError("All fields are required!");
      return;
    }

    navigate("/login");
    console.log("Signing up:", user);

    try {
      const response = await fetch('https://usermanagement-1-j7ng.onrender.com/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }); 
      if(response.ok){
        const res_data = await response.json()
        console.log("response from server", res_data.token)
       storetokenInLs( res_data.token)
        setUser({ 
          username: "",
          email: "",
          number: "",
          password: ""})
          navigate("/login");
      }

      console.log(response);
    } catch (error) {
      console.log("Register Error:", error);
    }
  };


  return (
    <div className="w-screen flex justify-center items-center min-h-screen text-black bg-[#F8EFE2]">
      <div className="w-[90%] sm:w-[400px] p-8 bg-white shadow-2xl rounded-2xl text-center">
        <h2 className="text-3xl font-bold text-[#181d24]">Sign Up</h2>
        <p className="text-gray-600 mt-2">Create an account to get started.</p>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <form className="mt-6 text-left" onSubmit={handleSignup}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#FFB400] focus:outline-none"
                value={user.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
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

          {/* Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="number"
                name="number"
                placeholder="Enter your number"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#FFB400] focus:outline-none"
                value={user.number}
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
                placeholder="Create a password"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#FFB400] focus:outline-none"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="btn2 w-full text-black font-bold py-3 rounded-lg hover:bg-[#D99C00] transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already Have an Account */}
        <div className="mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span className="text-[#FFB400] cursor-pointer hover:underline" >
             <Link to="/login"> Login </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
