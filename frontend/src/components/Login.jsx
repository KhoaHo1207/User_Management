import React, { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/userAction";
function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginContext } = useContext(UserContext);
  const isLoading = useSelector((state) => state.users.isLoading);
  const account = useSelector((state) => state.users.account);
  const handleLogin = async () => {
    if (email && password) {
      dispatch(userLogin(email, password));

      // let res = await loginApi(email.trim(), password);
      // if (res && res.token) {
      //   loginContext(email, res.token);
      //   toast.success("Login successfully");
      //   setEmail("eve.holt@reqres.in");
      //   setPassword("cityslicka");
      //   setIsLoading(false);
      //   navigate("/");
      //   console.log(res);
      // } else {
      //   console.log(res);
      //   if (res && res.status === 400) {
      //     toast.error(res.data.error);
      //   }
      // }
    } else {
      toast.error("Please enter email & password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  useEffect(() => {
    if (account && account.auth) {
      navigate("/");
    }
  }, [account]);
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>
      <div className="text">Email or Username</div>
      <input
        type="text"
        placeholder="Email or username..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="text">Password</div>
      <div className="password">
        <input
          type={`${showPassword ? "text" : "password"}`}
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
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
        disabled={email && password && !isLoading ? false : true}
        onClick={() => handleLogin()}
      >
        {isLoading && <i class="fa-solid fa-spinner fa-spin-pulse"></i>}
        &nbsp; Login
      </button>
      <div className="back">
        <i class="fa-solid fa-arrow-left"></i>
        &nbsp; Go back
      </div>
    </div>
  );
}

export default Login;
