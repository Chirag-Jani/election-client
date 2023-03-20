import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    dob: null,
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const signup = async (e) => {
    e.preventDefault();
    const { name, email, password, dob } = credentials;

    const res = await fetch("http://127.0.0.1:5000/auth/signup/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        dob,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.authToken) {
      navigate("/");
      alert("Signup Successful", "success");
      // props.showAlert("Signup Successful", "success");
    } else {
      alert("Error Signing up", "danger");
      // props.showAlert("Error Signing up", "danger");
    }
  };

  return (
    <div className="text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form onSubmit={signup}>
          <h1 className="h3 mb-3 fw-normal">Sign up</h1>
          <div className="form-floating my-4">
            <input
              type="text"
              className="form-control"
              id="floatingInputName"
              placeholder="Your Name"
              onChange={handleChange}
              name="name"
              value={credentials.name}
            />
            <label htmlFor="floatingInputName">Name</label>
          </div>
          <div className="form-floating my-4">
            <input
              type="date"
              className="form-control"
              id="floatingInputDob"
              placeholder="Your DOB"
              onChange={handleChange}
              name="dob"
              value={credentials.dob}
            />
            <label htmlFor="floatingInputDob">DOB</label>
          </div>
          <div className="form-floating my-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleChange}
              name="email"
              value={credentials.email}
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
              name="password"
              value={credentials.password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
          </button>
          <p className="mt-5 mb-3 text-muted">© Jani</p>
        </form>
      </main>
    </div>
  );
};

export default Signup;
