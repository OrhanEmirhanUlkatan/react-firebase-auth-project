/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import "./welcome.css";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleSignUp = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("");
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("");
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
      <div className="login-register-container">
        <h1>Firebase Auth</h1>
        <p>email: admin@admin.com</p>
        <p>password: admin123</p>
        {isRegister ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              type="Password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={() => setIsRegister(false)}>
              I have an already account
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={() => setIsRegister(true)}>
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
