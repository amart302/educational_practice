npm install
1. cd backend
2. node inde.js
3. cd kt6
4. npm start

# <span style="color: green;">Локальные части (внутри компонента React)</span>

## <span style="color: darkgreen;">1. Работа с `useState`</span>
```javascript
const [isModalOpen, setIsModalOpen] = useState(false);
```
- **Что это делает:**  
  `useState` — это хук React, который позволяет добавлять состояние в функциональные компоненты.  
  В данном случае, `isModalOpen` — это переменная, которая хранит состояние модального окна (открыто/закрыто).  
  `setIsModalOpen` — это функция, которая обновляет это состояние.

---

## <span style="color: darkgreen;">2. Работа с `useEffect`</span>
```javascript
useEffect(() => {
  fetch("http://localhost:3333/categories/all")
    .then(response => response.json())
    .then(data => setCategories(data));
}, []);
```
- **Что это делает:**  
  `useEffect` — это хук React, который позволяет выполнять побочные эффекты (например, загрузку данных) в функциональных компонентах.  
  В данном случае, при загрузке компонента (`[]` означает, что эффект выполняется только один раз), данные о категориях загружаются с сервера и сохраняются в состояние `categories`.

---

## <span style="color: darkgreen;">3. Работа с формами</span>
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  alert(`Name: ${user.name}, Email: ${user.email}, Number: ${user.number}`);
  setUser({ name: '', email: '', number: '' });
};
```
- **Что это делает:**  
  - `e.preventDefault()` — предотвращает стандартное поведение формы (перезагрузку страницы).  
  - `alert` — выводит данные пользователя (имя, email, номер телефона).  
  - `setUser` — сбрасывает состояние формы, очищая поля ввода.

---

## <span style="color: darkgreen;">4. Условный рендеринг</span>
```javascript
{cartItems.length === 0 ? (
  <p className="empty">Тут ничаго нэт</p>
) : (
  cartItems.map((item) => (
    <div key={item.id} className="cartItem">
      <img src={item.image} alt={item.title} className="itemImage" />
    </div>
  ))
)}
```
- **Что это делает:**  
  Используется тернарный оператор (`? :`) для условного рендеринга.  
  Если корзина пуста (`cartItems.length === 0`), отображается сообщение "Тут ничаго нэт".  
  Иначе, отображается список товаров в корзине.

---

## <span style="color: darkgreen;">5. Работа с ключами (`key`) в списках</span>
```javascript
{cartItems.map((item) => (
  <div key={item.id} className="cartItem">
    <img src={item.image} alt={item.title} className="itemImage" />
  </div>
))}
```
- **Что это делает:**  
  `key` — это специальный атрибут, который помогает React идентифицировать элементы списка.  
  В данном случае, `item.id` используется как уникальный ключ для каждого товара в корзине.  
  Это помогает React эффективно обновлять DOM при изменении списка.

---

## <span style="color: darkgreen;">6. Работа с модальными окнами</span>
```javascript
const [isModalOpen, setIsModalOpen] = useState(false);

const handleOrder = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};
```
- **Что это делает:**  
  - `useState` управляет видимостью модального окна (`isModalOpen`).  
  - `handleOrder` — открывает модальное окно, устанавливая `isModalOpen` в `true`.  
  - `closeModal` — закрывает модальное окно, устанавливая `isModalOpen` в `false`.

---

# <span style="color: orange;">Глобальные части (за пределами компонента)</span>

## <span style="color: darkorange;">2.1 Работа с `useDispatch` и `useSelector`</span>
```javascript
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.items);
```
- **Что это делает:**  
  - `useDispatch` — возвращает функцию `dispatch`, которая используется для отправки действий (actions) в Redux store.  
  - `useSelector` — выбирает данные из Redux store.  
  В данном случае, выбираются товары из корзины (`state.cart.items`).

---

## <span style="color: darkorange;">2.2 Работа с `createSlice` (Redux Toolkit)</span>
```javascript
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      saveCartToLocalStorage(state.items);
    },
  },
});
```
- **Что это делает:**  
  `createSlice` — это функция из Redux Toolkit, которая упрощает создание редюсера и действий (actions).  
  - `name` — имя среза (slice).  
  - `initialState` — начальное состояние корзины, загруженное из `localStorage`.  
  - `reducers` — объект с функциями-редюсерами, которые изменяют состояние.  
  В данном случае, `addToCart` добавляет товар в корзину или увеличивает его количество, если он уже есть.

---

## <span style="color: darkorange;">2.3 Работа с `createAsyncThunk`</span>
```javascript
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:3333/products/all');
    const data = await response.json();
    return data;
  }
);
```
- **Что это делает:**  
  `createAsyncThunk` — это функция из Redux Toolkit, которая создает асинхронные действия (actions).  
  - Первый аргумент — префикс для типов действий (например, `products/fetchProducts`).  
  - Второй аргумент — асинхронная функция, которая возвращает данные.  
  В данном случае, данные о товарах загружаются с сервера.

---

## <span style="color: darkorange;">2.4 Работа с `localStorage`</span>
```javascript
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};
```
- **Что это делает:**  
  `localStorage` — это встроенный в браузер механизм для хранения данных.  
  - `localStorage.getItem` — получает данные по ключу.  
  - `localStorage.setItem` — сохраняет данные по ключу.  
  - `JSON.parse` и `JSON.stringify` — преобразуют данные в строку и обратно.  
  В данном случае, корзина загружается из `localStorage` при инициализации приложения.

---

## <span style="color: darkorange;">2.5 Работа с React Router</span>
```javascript
<Link to={`/categories/${category.id}`}>
  <img src={category.image} alt={category.title} />
  <p>{category.title}</p>
</Link>
```
- **Что это делает:**  
  `Link` — это компонент из React Router, который позволяет переходить между страницами без перезагрузки.  
  `to` — указывает путь, на который нужно перейти.  
  В данном случае, при клике на категорию, пользователь переходит на страницу этой категории.

---

## <span style="color: darkorange;">2.6 Работа с асинхронными запросами</span>
```javascript
useEffect(() => {
  fetch("http://localhost:3333/products/all")
    .then(response => response.json())
    .then(data => setItem(data));
}, []);
```
- **Что это делает:**  
  - `fetch` — отправляет запрос на сервер.  
  - `response.json()` — преобразует ответ в JSON.  
  - `setItem` — обновляет состояние данными, полученными с сервера.  
  В данном случае, данные о товарах загружаются с сервера при монтировании компонента.

---

## <span style="color: darkorange;">2.7 Работа с ошибками</span>
```javascript
if (error) {
  return <div>Error: {error}</div>;
}
```
- **Что это делает:**  
  Если произошла ошибка, отображается сообщение об ошибке.  
  Ошибка может быть получена из состояния Redux или локального состояния.  

---
