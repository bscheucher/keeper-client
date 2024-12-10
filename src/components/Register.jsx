import React, { useState } from "react";

function Register({ onRegister, onSwitch }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form.username, form.password);
  };

  return (
    <div>
      <h2 className="form-heading">Register</h2>
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
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={onSwitch} className="form-btn">
          Login here
        </button>
      </p>
    </div>
  );
}

export default Register;
