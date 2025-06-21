import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./item.scss";

const Item = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1); // Начальное количество товара
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.categories);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3333/products/${productId}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const productFromRedux = Object.values(products).flat().find((item) => item.id === parseInt(productId));
    if (productFromRedux) {
      setProduct(productFromRedux);
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity: count })); // Передаем количество товаров
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Header />
      <main>
        <div className="containerTovar">
          <div className="imageTovar">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="overviewTovar">
            <h3>{product.title}</h3>
            <div className="priceTovar">
              {product.discont_price ? (
                <>
                  <span className="newPrice">${product.discont_price}</span>
                  <span className="oldPrice">${product.price}</span>
                </>
              ) : (
                <span className="newPrice">${product.price}</span>
              )}
            </div>
            <div className="containerCount">
              <div className="countTovar">
                <button onClick={() => setCount(Math.max(1, count - 1))}>-</button>
                <div className="count"><p>{count}</p></div>
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              <div className="btnTovar">
                <button onClick={handleAddToCart}>Add to cart</button>
              </div>
            </div>
            <div className="descriptionTovar">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Item;