import logo from "../../image/logo.png";
import basket from "../../image/basket=empty.png";
import './header.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items); // Получаем товары из корзины
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Считаем общее количество товаров

  return (
    <header>
      <div className="containerHeader">
        <div className="mainHeader">
          <div className="logo">
            <Link to={"/"}><img src={logo} alt="#" /></Link>
          </div>
          <div className="navMenu">
            <nav>
              <ul>
                <li>
                  <Link to={"/"}>Main Page</Link>
                </li>
                <li>
                  <Link to={"/categories"}>Categories</Link>
                </li>
                <li>
                  <Link to={"/Allproducts"}>All products</Link>
                </li>
                <li>
                  <Link to={"/AllSales"}>All sales</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="basket">
            <Link to={"/basket"}>
              <img src={basket} alt="#" />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;