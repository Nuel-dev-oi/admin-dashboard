import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Signup from "./Signup";
import Home from "./Home";
import Login from "./Login";

interface User {
    name: string
    isAdmin: boolean
}

const Pages = (): React.JSX.Element => {
  const cuurrent_user = JSON.parse(localStorage.getItem("user")!);
  const name = cuurrent_user?.name || "";
  const [user, setUser] = useState<User>({name, isAdmin: false});

  const onSetUser = (value: User) => {
    setUser(value);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onSetUser={onSetUser} />} />
      </Routes>
    </Router>
  );
};

export default Pages;
