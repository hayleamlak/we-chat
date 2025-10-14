// src/components/Dashboard.jsx
import React from "react";

export default function Dashboard({ user, onLogout }) {
  return (
    <div style={{ maxWidth: 300, margin: "auto", textAlign: "center" }}>
      <h2>Welcome, {user.email}</h2>
      <button onClick={onLogout} style={{ padding: 10, marginTop: 20 }}>
 
      </button>
    </div>
  );
}
