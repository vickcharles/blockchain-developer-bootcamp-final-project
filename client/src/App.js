import React, { useEffect } from "react";
import Properties from "./components/containers/properties/Properties";
import AppNavBar from "./components/ui/NavBar/AppNavBar";
import "./App.css";
import { getUserAddresses } from "./redux/AccountSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavBar />
      <Properties />
    </div>
  );
};

export default App;
