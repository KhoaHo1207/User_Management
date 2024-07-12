import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>
      <div className="text">Email or Username</div>
      <input
        type="text"
        placeholder="Email or username..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="text">Password</div>
      <div className="password">
        <input
          type={`${showPassword ? "text" : "password"}`}
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="eyes pe-auto">
          <i
            className={`fa-regular ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } pe-auto`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
      >
        Login
      </button>
      <div className="back">
        <i class="fa-solid fa-arrow-left"></i>Go back
      </div>
    </div>
  );
}

export default Login;
