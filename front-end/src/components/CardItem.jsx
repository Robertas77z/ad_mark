import React from "react";
import "../styles/Card-style.css";

const CardItem = ({ card }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{card.title}</h5>
        <p className="card-text">Aprašymas: {card.description}</p>
       
        <img
          src={card.imageUrl}
          alt={card.title}
          className="img-fluid img-small"
        />
        <p className="card-text">Kaina: {card.price}</p>
        <p className="card-text">Miestas: {card.city}</p>
        {card.category && (
          <p className="card-text">Kategorija: {card.category.name}</p>
        )}

      </div>
    </div>
  );
};

export default CardItem;
