import React, { useEffect } from "react";
import "./App.css";
import { getUserAddresses } from "./redux/AccountSlice";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import HomePage from "./components/containers/pages/HomePage";
import AppNavBar from "./components/ui/NavBar/AppNavBar";
import AddProperty from "./components/containers/pages/AddProperty";
import MyRentals from "./components/containers/pages/MyRentals";

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
        <Route path="/rentals" element={<MyRentals />} />
      </Routes>
      <section
        id="bottom-navigation"
        class="flex justify-between fixed inset-x-0 bottom-0 z-10 bg-white shadow p-5 md:hidden"
      >
        <NavLink
          to="/"
          label={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          }
        />

        <NavLink
          to="/create"
          label={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <NavLink
          to="/rentals"
          label={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      </section>
    </div>
  );
};

export default App;

function NavLink({ label, to, activeOnlyWhenExact }) {
  let match = useMatch({
    path: to,
    end: activeOnlyWhenExact,
  });

  return (
    <Link to={to} className={!match ? "text-gray-400" : "text-indigo-400"}>
      {label}
    </Link>
  );
}
