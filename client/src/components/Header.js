import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style.css";
import logo from "../assets/images/logo-travel.webp";

const Header = () => {
  return (
    <Navbar
      expand="lg"
      style={{
        background: "#2C3E50",
        color: "white",
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Travel Planner Logo"
            style={{
              height: "40px",
              width: "auto",
              marginRight: "10px",
            }}
          />
          Travel Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="nav-link"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/itin"
              className="nav-link"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Itinerary
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/hotels"
              className="nav-link"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Hotels
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/restaurants"
              className="nav-link"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Restaurants
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/createitin"
              className="nav-link"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Personal Itinerary
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
