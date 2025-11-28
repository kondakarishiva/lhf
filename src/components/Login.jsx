import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import * as auth from "../services/auth";

export default function Login(){
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"student" });
  const [err, setErr] = useState(null);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = (e) => {
    e.preventDefault();
    try{
      if(isRegister){
        auth.register(form);
      } else {
        auth.login(form);
      }
      navigate("/home");
    } catch(err){
      setErr(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box card">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {err && <div className="err">{err}</div>}
        <form onSubmit={submit}>
          {isRegister && <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />}
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
          {isRegister && (
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          )}
          <button className="btn" type="submit">{isRegister ? "Create account" : "Login"}</button>
        </form>

        <div className="small" style={{marginTop:12}}>
          <button className="link-btn" onClick={()=>setIsRegister(!isRegister)}>
            {isRegister ? "Have an account? Login" : "New here? Register"}
          </button>
        </div>

        <div style={{marginTop:10}} className="small">
          welcome to learnig hub lets start our journey ewwwww
        </div>
      </div>
    </div>
  );
}
