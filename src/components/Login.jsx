import React, { useState } from "react";

function Login({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form.username, form.password);
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="form-heading">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="form-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <button onClick={onSwitch} className="form-btn">
            {" "}
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
