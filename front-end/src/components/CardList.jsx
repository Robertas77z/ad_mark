import React from 'react';
import CardItem from './CardItem';

const CardList = ({ cards }) => {
    return (
        <div className="card-list">
            {cards.map((card) => (
                <div key={card.id}>
                    <CardItem card={card} />
                </div>
            ))}
        </div>
    );
};

export default CardList;
