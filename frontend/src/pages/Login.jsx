import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/login",
        { email, password }
      );

      if (res.data.success) {
        localStorage.setItem("token" , res.data.token);
        // alert("Login Successful!");
        navigate("/");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-900 mt-12">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Login
        </h2>
        <p className="text-red-500 mb-2">

      {error}
        </p>
        
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
         
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

