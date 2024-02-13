import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProfilePage from "./Pages/Profile";
import { AppContext } from "./Contexts/AppContext";

const App = () => {
  const [token, setToken] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  return (
    <AppContext.Provider value={{ token, setToken, currUser, setCurrUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/profilePage" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
