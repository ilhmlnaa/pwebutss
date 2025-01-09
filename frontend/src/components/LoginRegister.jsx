import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { login, register, apiStatus } from "../utils/Api";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(null);
  const [msgType, setMsgType] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkServerStatus = async () => {
      setStatus(null);
      try {
        const response = await apiStatus();
        if (response.statusCode === 200) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      } catch (error) {
        setStatus(false);
      }
    };

    checkServerStatus();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (status !== true) {
      setMsg("Server is offline. Please try again later.");
      setMsgType("error");

      setUsername("");
      setPassword("");

      setTimeout(() => {
        setMsg("");
        setMsgType("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await login(username, password);

      if (response && response.statusCode === 200) {
        const token = response.data.jwt_token;

        sessionStorage.setItem("jwt_token", token);
        sessionStorage.setItem("info", "malas buat http only🗿");

        setMsg("Login successful. Redirecting...");
        setMsgType("success");

        setUsername("");
        setPassword("");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

        setTimeout(() => {
          setMsg("");
          setMsgType("");
        }, 2000);
      } else {
        const errorMessage =
          response.message || "Login failed. Please check your credentials.";
        setMsg(errorMessage);
        setMsgType("error");

        setUsername("");
        setPassword("");

        setTimeout(() => {
          setMsg("");
          setMsgType("");
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err);

      const errorMessage =
        err.response?.data?.message || "An error occurred during login.";
      setMsg(errorMessage);
      setMsgType("error");

      setUsername("");
      setPassword("");

      setTimeout(() => {
        setMsg("");
        setMsgType("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("Password and confirm password do not match");
      setMsgType("error");
      setTimeout(() => {
        setMsg("");
        setMsgType("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await register(username, password, confirmPassword);

      if (response && response.statusCode === 201) {
        setMsg("Registration successful. Please login.");
        setMsgType("success");
        setLoading(false);

        setTimeout(() => {
          setMsg("");
          setMsgType("");
          setIsRegister(false);
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        }, 2000);
        return;
      } else {
        const errorMessage =
          response.message || "Registration failed. Please try again.";
        setMsg(errorMessage);
        setMsgType("error");

        setUsername("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          setMsg("");
          setMsgType("");
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error during registration:", err);
      const errorMessage =
        err.response?.data?.message || "Server Error. Please try again later.";
      setMsg(errorMessage);
      setMsgType("error");

      setUsername("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setMsg("");
        setMsgType("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="w-full overflow-auto min-h-screen lg:w-[35%] p-3 lg:p-5 flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full m-2 max-w-md bg-white-shadow-lg-rounded-lg p-8 ">
        <div className="flex justify-center mb-6">
          <img src="gundar.png" alt="" className="w-44 h-44 object-cover" />
        </div>

        {isRegister ? (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-gray-600 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Confirm your password"
                required
              />
            </div>

            {msg && (
              <div
                className={`mb-4 text-center ${
                  msgType === "error" ? "text-red-500" : "text-green-500"
                }`}
              >
                <p>{msg}</p>
              </div>
            )}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition flex justify-center items-center"
              >
                {loading ? (
                  <Bars height={20} width={50} color="#ffffff" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        ) : (
          // Form Login
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
                placeholder="Enter your password"
                required
              />
            </div>

            {msg && (
              <div
                className={`mb-4 text-center ${
                  msgType === "error" ? "text-red-500" : "text-green-500"
                }`}
              >
                <p>{msg}</p>
              </div>
            )}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition flex justify-center items-center"
              >
                {loading ? (
                  <Bars height={20} width={50} color="#ffffff" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        )}

        <div className="text-sm text-gray-600 text-center mt-4">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                onClick={handleRegisterToggle}
                className="text-purple-600 hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={handleRegisterToggle}
                className="text-purple-600 hover:underline"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
      <div className="w-full m-2 max-w-md bg-white shadow-lg rounded-lg p-8 ">
        <div className="bg-[#FFF2D0] p-3 rounded-lg font-bold">
          <h2 className="text-[#AD7903] text-center">Default Account</h2>
          <div className="text-yellow-500 mt-3">
            <p className="text-center">username: admin</p>
            <p className="text-center">password: admin</p>
          </div>
          <div className="mt-3">
            {status === null ? (
              <div className="text-gray-400 text-center">
                Checking server status...
              </div>
            ) : status ? (
              <div className="text-green-500 text-center">Server Online</div>
            ) : (
              <div className="text-red-500 text-center">Server Offline</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
