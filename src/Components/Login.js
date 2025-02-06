import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("")
  const [place, setPlace] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const url = isLogin ? "http://localhost:5500/login" : "http://localhost:5500/signup";
      const payload = isLogin ? { emailId, password } : { firstName, lastName, place, gender, emailId, password };
      await axios.post(url, payload, { withCredentials: true });
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data);
    }
  }

  return (
    <div className="d-flex justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "548px", marginTop: "32px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">{isLogin ? "Log In" : "Sign Up"}</h2>
          {!isLogin && (
            <>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Place</label>
                <input type="text" className="form-control" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Enter your place" />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Enter Email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
          </div>
          {err && <p className="text-danger">{err}</p>}
          <button className="btn btn-primary w-100" onClick={handleSubmit}>{isLogin ? "Log In" : "Sign Up"}</button>
          <p className="text-center mt-3 text-primary" style={{ cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "New user? Sign up here" : "Existing user? Log in here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;