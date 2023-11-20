import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isLoggedIn } = useSelector((state) => state.login || {});
  const { photoURL } = user || {};

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar_container">
      <div
        style={{
          background: "#D7CEF7",
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* logo */}
        <div className="">
          <img
            src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1700148264/todo_ukgd6n.png"
            width="50vh"
            alt="logo"
          />
        </div>
        <div
          style={{ marginRight: "10vh", display: "flex", alignItems: "center" }}
        >
          <div style={{ borderRadius: "50%" }}>
            <button
              onClick={handleMenuToggle}
              style={{
                border: "none",
                borderRadius: "50%",
                marginLeft: "10vh",
              }}
            >
              <div>
                <img
                  src={photoURL}
                  style={{
                    width: "5vh",
                    height: "5vh",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </button>
            {isMenuOpen && (
              <div className="custom-menu">
                <button id="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
