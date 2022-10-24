/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import "./homepage.css";
const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="welcome">
      <h1>Welcome {auth.currentUser.email}</h1>
      <button className="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Homepage;
