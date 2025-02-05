import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Itin from "./pages/Itin";
import Weather from "./pages/Weather";
import Search from "./pages/Search";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/itin" element={<Itin />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}
