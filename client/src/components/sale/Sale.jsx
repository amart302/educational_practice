import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Sale = ({ products, categories }) => {
    // Состояния для фильтров
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // Состояние для сортировки

    // Фильтрация товаров
    const filteredProducts = products.filter(product => {
        const price = product.discont_price || product.price;
        const hasDiscount = product.discont_price; // Только товары со скидкой
    
        // Фильтр по цене
        const priceFilter =
            (!minPrice || price >= parseFloat(minPrice)) &&
            (!maxPrice || price <= parseFloat(maxPrice));
    
        // Фильтр по категории
        const categoryFilter =
            !selectedCategory || String(product.categoryId) === selectedCategory; // Преобразуем categoryId в строку
    
        return hasDiscount && priceFilter && categoryFilter;
    });

    // Сортировка товаров
    const sortedProducts = filteredProducts.sort((a, b) => {
        const priceA = a.discont_price || a.price;
        const priceB = b.discont_price || b.price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Объект с названиями категорий
    const categoryTitles = {
        1: 'Annuals',
        2: 'Nursery',
        3: 'Garden Art',
        4: 'Plant Care',
        5: 'Seasonal',
    };

    // Функция для сброса фильтров
    const resetFilters = () => {
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSortOrder('asc');
    };

    return (
        <div className="discountedProductsContainer">
            <h1>Discounted Products</h1>

            <div className="sort">
                <div className="filterPrice">
                    <p>Price</p>
                    <input
                        placeholder="from"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        maxLength={6}
                    />
                    <input
                        type="number"
                        maxLength={6}
                        placeholder="to"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                <div className="sorted">
                    <p>Sorted</p>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Упал вставай</option>
                        <option value="desc">Встал упал</option>
                    </select>
                </div>

                <div className="sorted">
                    <p>Category</p>
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {Object.keys(categoryTitles).map((categoryId) => (
                            <option key={categoryId} value={categoryId}>
                                {categoryTitles[categoryId]}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="resetFilters" onClick={resetFilters}>
                    Сбросить баласт
                </button>
            </div>

            <div className="containerCard">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
 <Link to={`/${product.id}`}>    <div className="itemCard" key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <div className="titleItemCard">
                                <p>{product.title}</p>
                            </div>
                            <div className="priceItem">
                                <h1>${product.discont_price}</h1>
                                <h2><s>${product.price}</s></h2>
                            </div>
                            <div className="discountBlock">
                                <span>
                                    -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                                </span>
                            </div>
                        </div>
                    </Link>
                    ))
                ) : (
                    <p>Лафа закончилась</p>
                )}
            </div>
        </div>
    );
};

export default Sale;