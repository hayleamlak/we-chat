// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom"; // This is the protected page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
