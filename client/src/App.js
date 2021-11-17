import React, { useEffect } from "react";
import "./App.css";
import { getUserAddresses } from "./redux/AccountSlice";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/containers/homepage/HomePage";
import AppNavBar from "./components/ui/NavBar/AppNavBar";
import AddProperty from "./components/containers/pages/AddProperty";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<AddProperty />} />
        <Route path="/rentals" element={<div>My rentas goes here</div>} />
      </Routes>
    </div>
  );
};

export default App;
