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
  const[isLogin, setIsLogin] = useState(false)
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await  axios.post(
        "http://localhost:5500/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      return navigate("/");
      //   console.log("res", res.data)
    } catch (err) {
      setErr(err?.response?.data);
    }
  }

 async function handleSignUp(){
    try {
      const res = await axios.post(
        "http://localhost:5500/signup",
        {
          firstName,
          lastName,
          place,
          gender,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      return navigate("/");
      //   console.log("res", res.data)
    } catch (err) {
      setErr(err?.response?.data);
    }
  }

  return (
    <div className="flex justify-center m-6">
      <div className="card bg-base-100 w-96 shadow-xl border-l-blue-700">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Log In" : "Sign Up"}</h2>
          <label className="form-control w-full max-w-xs">
            {
              !isLogin ?<>
              <div className="label">
              <span className="label-text">First Name :</span>
            </div>
            <input
              type="text"
              placeholder="Enter First Name"
              className="input input-bordered w-full max-w-xs"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <div className="label">
              <span className="label-text">Last Name :</span>
            </div>
            <input
              type="text"
              placeholder="Enter First Name"
              className="input input-bordered w-full max-w-xs"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <div className="label">
              <span className="label-text">Place :</span>
            </div>
            <input
              type="text"
              placeholder="Enter your place"
              className="input input-bordered w-full max-w-xs"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />

            <div className="label">
              <span className="label-text">Gender :</span>
            </div>
            <input
              type="text"
              placeholder="Enter male, female or others only"
              className="input input-bordered w-full max-w-xs"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />

            <div className="label">
              <span className="label-text">Email Id :</span>
            </div>
            <input
              type="text"
              placeholder="Enter email ID"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />

            <div className="label">
              <span className="label-text">Password :</span>
            </div>
            <input
              type="password"
              placeholder="*********"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
              </>  : <>
                <div className="label">
              <span className="label-text">Email Id :</span>
            </div>
            <input
              type="text"
              placeholder="Enter email ID"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />

            <div className="label">
              <span className="label-text">Password :</span>
            </div>
            <input
              type="password"
              placeholder="*********"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }} />
              </>
            }


            <p className="text-red-500">{err}</p>
          </label>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>
             {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin
              ? "New user, Signup here"
              : "Existing user, Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
