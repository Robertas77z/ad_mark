import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Ad_mark.png";
import "../styles/Header-styles.css";
import { getLoggedInUser, logout, isUserLoggedIn } from "../services/AuthService";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = ({ onShowFavorites, onSearch }) => { 
  const [showModal, setShowModal] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const username = getLoggedInUser();
    console.log("Prisijungęs naudotojas:", username); 
    if (username) {
      setLoggedInUsername(username);
    }
    
    setIsAdmin(username === "admin"); 
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload(); 
  };

  const handleModalClose = () => {
    console.log("Modalas uždarytas"); 
    setShowModal(false);
  };

  const handleModalOpen = () => {
    console.log("Modalas atidarytas");
    setShowModal(true);
  };

  const handleShowFavorites = () => {
    onShowFavorites();
    setFilterActive(!filterActive);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <header className="header-style">
        <a href="">
          <img
            src={logo}
            height="100"
            alt="Logo"
            style={{ borderRadius: "10px" }}
          />
        </a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Ieškoti tarp visu esamu knygų"
            id="header-search"
            value={searchTerm}
            onChange={handleSearch}
          />
           <i className="fas fa-search"></i>
        </form>
        <div>
        
        </div>
        {isLoggedIn ? (
          <>
            <button className="users-initials" onClick={handleModalOpen}>
              {loggedInUsername
                .split(" ")
                .map((name) => name.slice(0, 2).toUpperCase())}
            </button>
          </>
        ) : (
          <>
            <div>
              <Link to="/register" className="btn btn-primary" id="register-btn">
                Registruotis
              </Link>
              <Link to="/login" className="btn btn-primary" id="login-btn">
                Prisijungti
              </Link>
            </div>
          </>
        )}
      </header>

      <Modal show={showModal} onHide={handleModalClose} className="user-modal">
        <Modal.Header className="user-modal-header">
          <Modal.Title>Naudotojas: {loggedInUsername}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Kurti skelbimą</p>
          
            <Link to="/admin" className="btn btn-primary">
              Kurti
            </Link>
          
        </Modal.Body>
        <Modal.Footer className="user-modal-footer">
          <Button
            variant="secondary"
            id="cancel-button"
            onClick={handleModalClose}
          >
            Atšaukti
          </Button>

          <Button variant="danger" id="yes-button" onClick={handleLogout}>
            Atsijungti
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Header;
