// src/components/ChatRoom.jsx
import React, { useEffect, useState, useRef } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import auth from "../firebase/auth";
import { db } from "../firebase/firebase";  // <-- named import, exact path

import Message from "./Message";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const dummy = useRef();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMsg.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMsg,
      createdAt: new Date(),
      userId: currentUser.uid,
      userEmail: currentUser.email,
    });

    setNewMsg("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  const logout = () => {
    signOut(auth);
  };

  if (!currentUser) return <p>Please log in to chat</p>;

  return (
    <div className="chat-room" style={{ maxWidth: "600px", margin: "auto" }}>
      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>
      <h2>Welcome, {currentUser.email}</h2>
      <div
        style={{
          minHeight: "400px",
          border: "1px solid #ccc",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} currentUserId={currentUser.uid} />
        ))}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="plase enter your message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          style={{ width: "50%", padding: "0.5rem" }}
          
        />
        <button type="submit" style={{ width: "80%", padding: "0.5rem" }}>
           submit
        </button>
      </form>
    </div>
  );
}
