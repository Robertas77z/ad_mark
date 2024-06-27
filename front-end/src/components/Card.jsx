import React, { useState, useEffect } from 'react';
import { getCardsAPICall } from '../services/CardService';
import CardItem from './CardItem';

const Card = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const cardsResponse = await getCardsAPICall();
            console.log("Gauti kortelių duomenys:", cardsResponse.data);
            setCards(cardsResponse.data);
        } catch (error) {
            console.error("Klaida gaunant duomenis:", error);
        }
    };

    return (
        <div>
            <h3>Kortelės</h3>
            {cards.map(card => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
};

export default Card;
