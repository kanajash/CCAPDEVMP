import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  // States
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [showPassword, setShowPassword] = useState(false); // State for Show Password

  // Login Function
  async function login() {
    const user = {
      email,
      password,
    };

    try {
      setloading(true);
      const result = await (
        await axios.post("http://localhost:5000/api/users/login", user)
      ).data;
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div>
      {/* If Loader and error is true only then the components will show */}
      {loading && <Loader />}
      {error && <Error message={"Invalid Credentials"} />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="bs border">
            <h1 className="text-center">Login</h1>

            {/* Email Input */}
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            {/* Password Input */}
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            {/* Show Password Toggle */}
            <div className="mt-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="ms-2">
                Show Password
              </label>
            </div>

            {/* Login Button */}
            <button className="btn btn-dark mt-3" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
