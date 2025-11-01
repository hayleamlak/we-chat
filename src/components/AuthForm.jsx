// src/components/AuthForm.jsx
import React, { useState } from "react";
import auth from "../firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export default 
function authform() {
  const [isRegister, setIsRegister] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="checkbox">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login here" : "Register here"}
        </span>
      </p>
      {error && <p style={{ color: "pink" }}>{error}</p>}


    </div>
  );
}
