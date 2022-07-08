import React from "react";
import {HomePage} from "./pages/home.jsx";
import {NotFoundPage} from "./pages/not-found.jsx";
import {Routes, Route, Link} from "react-router-dom";

export const App = () => {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};
