import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Itin from "./pages/Itin";
import Restaurants from "./pages/Restaurants";
import Hotels from "./pages/Hotels";
import Header from "./components/Header";
import CreateItinerary from "./pages/CreateItinerary";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/itin" element={<Itin />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/createitin" element={<CreateItinerary />} />
      </Routes>
    </Router>
  );
}
