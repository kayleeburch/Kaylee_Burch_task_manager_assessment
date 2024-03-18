import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskManager from "./TaskManager";
import RegisterForm from "./Authentication/userRegisterForm";
import LoginForm from "./Authentication/userLoginForm";

function App() {
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/current_user", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskManager currentUser={currentUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
