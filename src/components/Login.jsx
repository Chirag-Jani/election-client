import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/auth/login/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    let data = await res.json();
    if (data.authToken) {
      localStorage.setItem("token", data.authToken);
      localStorage.setItem("admin", data.user.admin);
      localStorage.setItem("userMail", credentials.email);
      alert("Logged in Successfully");
      // props.showAlert("Logged in Successfully", "success");
      navigate("/");
    } else {
      alert("Error Signing in");
      // props.showAlert("Error Signing in", "danger");
    }
  };

  return (
    <div className="text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form onSubmit={login}>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>
          <div className="form-floating my-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleChange}
              value={credentials.email}
              name="email"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating my-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handleChange}
              value={credentials.password}
              name="password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© Jani</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
