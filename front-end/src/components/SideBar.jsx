import React, { useState, useEffect } from 'react';
import { getCategoriesAPICall } from '../services/CategoryService';

const SideBar = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesAPICall()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Klaida gaunant kategorijas:", error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    console.log("Pasirinkta kategorija:", categoryId); 
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex-shrink-0 p-3 ms-4" style={{ width: "280px", height: "300px", paddingLeft: "16px", textAlign: "left" }}>
      <div className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
        <span
          className="fw-semibold"
          style={{
            fontSize: "20px",
            color: "white",
            backgroundColor: "rgb(75, 112, 245)",
            width: "217px",
            height: "56px",
            paddingLeft: "16px",
            paddingTop: "13px",
          }}
        >
          Kategorijos
        </span>
      </div>
      <ul className="list-unstyled ps-0">
        <li key="all-books" className="mb-1" style={{ color: "rgb(75, 112, 245)" }}>
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            onClick={() => handleCategoryClick(null)} 
            style={{ color: "rgb(75, 112, 245)" }}
          >
            Visos Kategorijos
          </button>
        </li>
        {categories.map(category => (
          <li key={category.id} className="mb-1" style={{ color: "#F4A261" }}>
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              onClick={() => handleCategoryClick(category.id)}
              style={{ color: "rgb(75, 112, 245)" }}
            >
              {category.name}
            </button>
          </li>
        ))}
        <li className="border-top my-3" style={{ borderColor: "rgb(75, 112, 245)" }}></li>
      </ul>
    </div>
  );
};

export default SideBar;
