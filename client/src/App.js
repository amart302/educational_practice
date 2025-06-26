import { Routes, Route } from 'react-router-dom'

import Home from "./pages/home/Home";
import Categories from "./pages/categories/Categories";
import Error from "./pages/error/Error";
import Annuals from "./pages/annuals/Annuals";
import Products from './components/products/Products';
import CategoryPage from './pages/category/Category';
import Allproducts from './pages/allProducts/Allproducts';
import AllSales from './pages/allSales/AllSales';
import Item from './pages/item/Item';
import BasketP from './pages/basket/BasketP';
function App() {

  

  return (
    <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="*" element={<Error />} />
        <Route path="/Allproducts" element={<Allproducts />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/AllSales" element={<AllSales />} />
        <Route path="/item/:productId" element={< Item/>} />
        <Route path='/basket' element={<BasketP />} />
      </Routes>
    </div>
  );
}

export default App;
