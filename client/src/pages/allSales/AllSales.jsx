import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import { addToCart } from '../../store/cartSlice'; // Импортируем действие для добавления в корзину
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';

const AllSales = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.products);

    // Состояния для фильтров и сортировки
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // Сортировка по цене

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    if (status === 'failed') {
        return <h1>Error: {error}</h1>;
    }

    // Получаем все товары
    const allProducts = Object.values(categories).flat();

    // Фильтрация по скидке (только товары со скидкой)
    const discountedProducts = allProducts.filter(product => product.discont_price);

    // Фильтрация по цене
    const filteredByPrice = discountedProducts.filter(product => {
        const price = product.discont_price;
        return (!minPrice || price >= parseFloat(minPrice)) && (!maxPrice || price <= parseFloat(maxPrice));
    });

    // Сортировка по цене
    const sortedProducts = filteredByPrice.sort((a, b) => {
        const priceA = a.discont_price;
        const priceB = b.discont_price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Функция для сброса фильтров
    const resetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setSortOrder('asc');
    };

    return (
        <>
            <Header />
            <main>
                <div className="productsTitle">
                    <h1>Discounted items</h1>
                </div>
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
                            <option value="asc">Упал встаешь</option>
                            <option value="desc">Встаешь упал</option>
                        </select>
                    </div>

                    <button className="resetFilters" onClick={resetFilters}>
                        Сбросить баласт
                    </button>
                </div>

                <div className="containerCard">
                    {sortedProducts.map((product) => (
                        <div className="itemCard" key={product.id}>
                            <Link to={`/item/${product.id}`}>
                                <img src={product.image} alt={product.title} />
                            </Link>
                            <div className="itemCard__overflow">
                            <button onClick={() => dispatch(addToCart({ product, quantity: 1 }))}>
                                    Add to cart
                                </button>
                            </div>
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
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AllSales;