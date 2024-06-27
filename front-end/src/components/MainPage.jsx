import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import CardItem from './CardItem'; 

import { getCategoriesAPICall } from '../services/CategoryService';
import "../styles/Card-style.css";
import { getCardsAPICall } from '../services/CardsService';

const MainPage = () => {
  const [cards, setCards] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCardsAndCategories();
  }, []);

  const fetchCardsAndCategories = async () => {
    try {
      const cardsResponse = await getCardsAPICall(); 
      const categoriesResponse = await getCategoriesAPICall();

      console.log("Gauti kortelių duomenys:", cardsResponse.data);
      console.log("Gauti kategorijų duomenys:", categoriesResponse.data);

    
      const cardsWithFavorites = cardsResponse.data.map(card => ({
        ...card,
        favorite: false 
      }));

      setCards(cardsWithFavorites);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Klaida gaunant duomenis:", error);
    }
  };

  const toggleFavorite = (cardId) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, favorite: !card.favorite } : card
    ));
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites); 
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

 
  const filteredCardsBySearchTerm = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCards = selectedCategory ? filteredCardsBySearchTerm.filter(card => card.categoryId === selectedCategory) : filteredCardsBySearchTerm;
  
  const favoriteCards = filteredCardsBySearchTerm.filter(card => card.favorite); 


  const cardsToShow = showFavorites ? favoriteCards : filteredCards;

  return (
    <>
      <Header onShowFavorites={handleShowFavorites} onSearch={handleSearch} />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <SideBar setSelectedCategory={setSelectedCategory} />
          </div>
          <div className="col-md-9">
            <div>
              <h3>Skelbimai</h3>
              <div className="card-container">
                {cardsToShow.map(card => (
                  <CardItem key={card.id} card={card} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
