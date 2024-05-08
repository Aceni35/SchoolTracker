import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "../LoginStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/HomeSlice";
import { useNavigate } from "react-router-dom";
import Spin from "../components/Spinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginLoading } = useSelector((store) => store.home);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password, navigate }));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="text-center">Login</h2>
        <div className="row">
          <CgProfile size={70} className="my-2" />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="login-label">
            Index number:
          </label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <button type="submit" className="rounded button-login">
              {loginLoading ? <Spin /> : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
