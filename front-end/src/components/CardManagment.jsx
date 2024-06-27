import React, { useState, useEffect } from 'react';
import {
  createCardAPICall,
  updateCardAPICall,
  deleteCardAPICall,
  getCardsAPICall,
} from '../services/CardsService';
import CardItem from './CardItem';
import { getCategoriesAPICall } from '../services/CategoryService';
import '../styles/CardManagement.css'; // Importuojame sukurtus stilius

const CardManagement = () => {
  const initialFormData = {
    id: null,
    title: '',
    description: '',
    isbn: '',
    imageUrl: '',
    pageCount: '',
    price: '',
    city: '',
    categoryId: 1,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await getCardsAPICall();
      console.log('Gauti kortelių duomenys:', response.data);
      setCards(response.data);
    } catch (error) {
      console.error('Klaida gaunant kortelę:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesAPICall();
      console.log('Gauti kategorijų duomenys:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Klaida gaunant kategorijas:', error);
    }
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    const { id, ...data } = formData;

    if (id) {
      try {
        await updateCardAPICall(id, data);
        console.log('Kortelė atnaujinta sėkmingai');
        fetchCards();
        resetFormFields();
      } catch (error) {
        console.error('Klaida atnaujinant kortelę:', error);
      }
    } else {
      try {
        await createCardAPICall(data);
        console.log('Kortelė sukurtas sėkmingai');
        fetchCards();
        resetFormFields();
      } catch (error) {
        console.error('Klaida kuriant kortelę:', error);
      }
    }
  };

  const resetFormFields = () => {
    setFormData(initialFormData);
  };

  const handleEditCard = (card) => {
    setFormData({
      id: card.id,
      title: card.title,
      description: card.description,
      isbn: card.isbn,
      imageUrl: card.imageUrl,
      pageCount: card.pageCount.toString(),
      price: card.price.toString(),
      city: card.city,
      categoryId: card.categoryId,
    });
  };

  const handleDeleteCard = async (id) => {
    try {
      await deleteCardAPICall(id);
      setCards(cards.filter((card) => card.id !== id));
      console.log('Kortelė ištrinta sėkmingai');
    } catch (error) {
      console.error('Klaida trinant kortelę:', error);
    }
  };

  return (
    <div className="mng-main">
      <h2 className="mng-h2">Kortelių valdymas</h2>
      <div className="mng-form">
        <form onSubmit={handleCardSubmit}>
          <div>
            <label>Pavadinimas:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Aprašymas:</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Paveiksliuko URL:</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          <div>
            <label>Kaina:</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div>
            <label>Miestas:</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>
          <div>
            <label>Kategorija:</label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              <option value={1}>Nauja kategorija</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mng-buttons">
            <button id="mng-btn-s" type="submit">
              {formData.id ? 'Atnaujinti' : 'Sukurti'}
            </button>
            {formData.id && (
              <button id="mng-btn-d" type="button" onClick={resetFormFields}>
                Atšaukti redagavimą
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="mng-cards-container">
        {cards.map((card) => (
          <div className="mng-card" key={card.id}>
            <div className="mng-card-content">
              <CardItem card={card} />
              <div className="mng-buttons">
                <button id="mng-btn-s" onClick={() => handleEditCard(card)}>
                  Redaguoti
                </button>
                <button id="mng-btn-d" onClick={() => handleDeleteCard(card.id)}>
                  Ištrinti
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardManagement;
