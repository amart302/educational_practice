import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from '../../store/productsSlice';
import { addToCart } from '../../store/cartSlice';
import './products.scss';

const Products = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showDiscounted, setShowDiscounted] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const { categoryId } = useParams();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    if (status === 'failed') {
        return <h1>Error: {error}</h1>;
    }

    const filteredProducts = selectedCategory
        ? categories[selectedCategory] || []
        : categoryId
        ? categories[categoryId] || []
        : Object.values(categories).flat();

    const filteredByPrice = filteredProducts.filter(product => {
        const price = product.discont_price || product.price;
        return (!minPrice || price >= parseFloat(minPrice)) && (!maxPrice || price <= parseFloat(maxPrice));
    });

    const filteredByDiscount = showDiscounted
        ? filteredByPrice.filter(product => product.discont_price)
        : filteredByPrice;

    const sortedProducts = filteredByDiscount.sort((a, b) => {
        const priceA = a.discont_price || a.price;
        const priceB = b.discont_price || b.price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    const categoryTitles = {
        1: 'Annuals',
        2: 'Nursery',
        3: 'Garden Art',
        4: 'Plant Care',
        5: 'Seasonal',
    };

    const resetFilters = () => {
        setSelectedCategory(null);
        setMinPrice('');
        setMaxPrice('');
        setShowDiscounted(false);
        setSortOrder('asc');
    };

    return (
        <main>
            <div className="productsTitle"><h1>All products</h1></div>
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

                <div className="filterDiscount">
                    <p>Discounted items</p>
                    <input
                        type="checkbox"
                        checked={showDiscounted}
                        onChange={(e) => setShowDiscounted(e.target.checked)}
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
                {sortedProducts.map((product) => (
                    <div className="itemCard" key={product.id}>
                        <Link to={`/item/${product.id}`}>
                            <img src={product.image} alt={product.title} />
                        </Link>
                        <div className="itemCard__overflow">
                            <button onClick={() => dispatch(addToCart({ product, quantity: 1 }))}>Add to cart</button>
                        </div>
                        <div className="titleItemCard">
                            <p>{product.title}</p>
                        </div>
                        <div className="priceItem">
                            {product.discont_price ? (
                                <>
                                    <h1>${product.discont_price}</h1>
                                    <h2><s>${product.price}</s></h2>
                                </>
                            ) : (
                                <h1>${product.price}</h1>
                            )}
                        </div>
                        {product.discont_price && (
                            <div className="discountBlock">
                                <span>
                                    -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Products;