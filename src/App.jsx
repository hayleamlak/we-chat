import { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      scrollToBottom();
    });
    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (newMsg.trim() === "") return;
    await addDoc(collection(db, "messages"), {
      text: newMsg,
      createdAt: serverTimestamp(),
    });
    setNewMsg("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 10 }}>
      <h1>We Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 400,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 10 }}>
            <strong>User:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message"
        style={{ width: "80%", padding: 10, marginRight: 10 }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
}
