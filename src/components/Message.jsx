// src/components/Message.jsx
import React from "react";

export default function Message({ message, currentUserId }) {
  const isOwnMessage = message.userId === currentUserId;

  return (
    <div
      style={{
        textAlign: isOwnMessage ? "right" : "left",
        margin: "0.5rem 0",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          backgroundColor: isOwnMessage ? "#0084ff" : "#e5e5ea",
          color: isOwnMessage ? "white" : "black",
          maxWidth: "60%",
          wordWrap: "break-word",
        }}
      >
        <p style={{ margin: 20}}>{message.text}</p>
        <small>{message.userEmail}</small>
      </div>
    </div>
    
  );
  
}
