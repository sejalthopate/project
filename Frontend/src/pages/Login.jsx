
 import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  const { setIsAuthenticated, setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://project-pd83.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setIsAuthenticated(true);
        setUser(data.user);

        // 🔁 role अनुसार redirect
        if (data.user.role === "admin") {
          navigate("/home");
        }
        
        else if (data.user.role === "student") {
         navigate("/home"); // 🔁 change if your route is different
        } 
        
        
         else if (data.user.role === "faculty") {
         navigate("/home"); // 🔁 change if your route is different
        } 
        else {
          alert("Access Denied: Invalid Role");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-gray-900 text-white px-4">
      <h1 className="text-4xl font-extrabold mb-8 transition-transform duration-300 hover:scale-105 hover:text-purple-300 text-center">
        Student Attendance Management System
      </h1>

      <div className="bg-[#0f172a] p-10 rounded-2xl shadow-lg w-full max-w-xl transition-transform duration-300 hover:shadow-purple-700 hover:scale-105">
        <div className="flex justify-center mb-6">
          <FaUser className="text-purple-400 text-5xl" />
        </div>

        <form onSubmit={handleLogin} className="space-y-6 text-lg">
          <div className="flex items-center bg-white text-black rounded px-4 py-3">
            <FaEnvelope className="mr-3 text-purple-500 text-xl" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="bg-transparent focus:outline-none w-full text-lg"
              required
            />
          </div>

          <div className="flex items-center bg-white text-black rounded px-4 py-3">
            <FaLock className="mr-3 text-purple-500 text-xl" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="bg-transparent focus:outline-none w-full text-lg"
              required
            />
          </div>

          <div className="flex items-center text-base">
            <input type="checkbox" id="remember" className="mr-2 w-5 h-5" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 text-lg font-semibold rounded hover:from-purple-600 hover:to-pink-600 transition duration-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;