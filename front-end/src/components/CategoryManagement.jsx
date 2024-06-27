import React, { useState, useEffect } from 'react';
import { createCategoryAPICall, getCategoriesAPICall, updateCategoryAPICall, deleteCategoryAPICall } from '../services/CategoryService';
import "../styles/CategoryManagment-style.css";

const CategoryManagement = () => {
    const [categoryName, setCategoryName] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await getCategoriesAPICall();
            setCategories(response.data);
        } catch (error) {
            console.error("Klaida gaunant kategorijas:", error);
        }
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (editingCategoryId) {
            updateCategoryAPICall(editingCategoryId, { name: editingCategoryName }).then(response => {
                console.log("Kategorija atnaujinta:", response.data);
                setEditingCategoryId(null);
                setEditingCategoryName("");
                setCategories(categories.map(category => category.id === response.data.id ? response.data : category));
            }).catch(error => {
                console.error("Klaida atnaujinant kategoriją:", error);
            });
        } else {
            createCategoryAPICall({ name: categoryName }).then(response => {
                console.log("Kategorija sukurta:", response.data);
                setCategoryName("");
                setCategories([...categories, response.data]);
            }).catch(error => {
                window.alert("Tokia kategorija jau egzistuoja");
                console.error("Klaida kuriant kategoriją:", error);
                
            });
        }
    };

    const handleEditCategory = (id, name) => {
        setEditingCategoryId(id);
        setEditingCategoryName(name);
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategoryAPICall(id);
            setCategories(categories.filter(category => category.id !== id));
            console.log("Kategorija ištrinta sėkmingai");
        } catch (error) {
            console.error("Klaida trinant kategoriją:", error);
        }
    };

    return (
        <div className='ctg-mng'>
            <h2>Kategorijų sąrašas</h2>
            <form onSubmit={handleCategorySubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Kategorijos pavadinimas</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        value={editingCategoryId ? editingCategoryName : categoryName} 
                        onChange={(e) => editingCategoryId ? setEditingCategoryName(e.target.value) : setCategoryName(e.target.value)} 
                    />
                </div>
                <button type='submit' className='btn btn-primary'>{editingCategoryId ? 'Atnaujinti' : 'Sukurti'}</button>
                
            </form>
            <ul className='list-group mt-3'>
                {categories.map(category => (
                    <li key={category.id} className='list-group-item d-flex justify-content-between align-items-center'>
                        {category.name}
                        <div>
                            <button className='btn btn-primary btn-sm me-2' onClick={() => handleEditCategory(category.id, category.name)}>Redaguoti</button>
                            <button className='btn btn-danger btn-sm' onClick={() => handleDeleteCategory(category.id)}>Ištrinti</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='mng-ctg-btn'>
                <a href="http://localhost:3000/admin">Grįžti atgal</a>
                </div>
        </div>
    );
};

export default CategoryManagement;