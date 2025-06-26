import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import './annualsCard.scss';

const AnnualsCard = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    if (status === 'failed') {
        return <h1>Error: {error}</h1>;
    }

    // Получаем список всех категорий
    const allCategories = Object.keys(categories);

    // Фильтруем продукты по выбранной категории
    const filteredProducts = selectedCategory
        ? categories[selectedCategory] || []
        : Object.values(categories).flat(); // Все продукты, если категория не выбрана

    return (
        <main>
            
        </main>
    );
};

export default AnnualsCard;