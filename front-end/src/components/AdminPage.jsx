import React from "react";
import { Link } from "react-router-dom";
import "../styles/Admin-page-style.css"

const CustomButton = ({ to, text }) => {
  return (
    <Link to={to} style={buttonStyle}>
      {text}
    </Link>
  );
};

const buttonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "5px",
  
};

const AdminPage = () => {
  return (
    <>
      <div className="admin-page-welcome">
        <h2>Sveiki atvykę !</h2>
      </div>
      <div className="admin-page-book-adm">
        Skelbimų administravimas
        <CustomButton to="/BookManagement" text="Skelbimų administravimas" />
      </div>
      <div className="admin-page-category-adm">
        Kategorijų administravimas
        <CustomButton to="/CategoryManagement" text="Kategorijų administravimas" />
      </div>
      <div className="adm-p-b">
      <a href="http://localhost:3000/main">Grįžti atgal</a>
      </div>
    </>
  );
};

export default AdminPage;
