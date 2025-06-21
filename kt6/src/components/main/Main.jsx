import './main.scss'
import { data, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
const Main = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3333/categories/all")
            .then(response => response.json())
            .then(data => setCategories(data),
                    setIsLoading(false));
                        
    }, [])

    const limitedCategories = categories.slice(0, 4);


    const [item, setItem] = useState([])

    useEffect(() => {
        fetch("http://localhost:3333/products/all")
            .then(response => response.json())
            .then(item => setItem(item),
                    setIsLoading(false));
                        
    }, [])

    const limitedItem = item.slice(0, 4)

    const [user, setUser] = useState(
        {
            name: '',
            email: '',
            number: '',
        })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Name: ${user.name}, Email: ${user.email}, Number: ${user.number}`)
    
        setUser({
            name: '',
            email: '',
            number: '',
          });
    }


    return (
        <main>
            <div className="selectionTop">
                <div className="containerST">
                    <div className="stTitle"><h1>Amazing Discounts <br /> on  Garden Products!</h1></div>
                    <div className="stbtn">
                        <Link to={'/categories/3'}><button>Check out</button></Link>    
                    </div>
                </div>
            </div> 

            <div className="selectionCategories">
                <div className="categoriesTitle">
                    <h1>Categories</h1>
                    <div className="categorieshr">
                        <div className="chr"><hr /></div>
                        <div className="cp"><Link to={"/Categories"}><p>All categories</p></Link></div>
                    </div>
                </div>

                <div className="categories">
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {limitedCategories.map(category => (
                                <div className="category" key={category.id}>
                                    <Link to={`/categories/${category.id}`}>
                                    <img src={category.image} alt={category.title} />
                                    <p>{category.title}</p>
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>


            <div className="selectionInput">
                <div className="titleInput">
                    <h>5% off on the first order</h>
                </div>
                <div className="cointainerInput">
                    <div className="imgInput">
                        <img src="./img/sInput.png"/>
                    </div>
                    <div className="feedbackInput">
                        <input
                        type="text"
                        name='name'
                        value={user.name}
                        placeholder="Name"
                        onChange={handleChange}/>  

                        
                        <input
                        type="number"
                        name='number'
                        value={user.number}
                        placeholder="Phone number"
                        onChange={handleChange}/>

                        <input
                        type="email"
                        name='email'
                        value={user.email}
                        placeholder="Email"
                        onChange={handleChange}/>

                        <div className="btnInput">
                            <button onClick={handleSubmit}> <b>Get a discount</b></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="selectionSale">
                <div className="saleTitle">
                    <h1>Sale</h1>
                    <div className="salehr">
                        <div className="chr2"><hr /></div>
                        <div className="cp"><Link to={"/AllSales"}><p>All sales</p></Link></div>
                    </div>
                </div>

                <div className="saleItem">
                    <div className="containerSale">

                            {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {limitedItem.map(item => {
                                const discountPercentage = item.discont_price
                                    ? Math.round(((item.price - item.discont_price) / item.price) * 100)
                                    : null;

                                return (
                                    <div className="item" key={item.id}>
                                        <img src={item.image} alt={item.title} />
                                        <div className="titleItem">
                                            <p>{item.title}</p>
                                        </div>
                                        <div className="priceItem">
                                            {item.discont_price ? (
                                                <>
                                                    <h1>${item.discont_price}</h1>
                                                    <h2><s>${item.price}</s></h2>
                                                </>
                                            ) : (
                                                <h1>${item.price}</h1>
                                            )}
                                        </div>
                                        {/* Блок со скидкой в процентах */}
                                        {discountPercentage && (
                                            <div className="discountBlock">
                                                <span>-{discountPercentage}%</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>    
        </div>
</main>
)
}
export default Main