import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './categorie.scss'


const Categorie = ()=> {

    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:3333/categories/all")
            .then(response => response.json())
            .then(data => setCategories(data),
                    setIsLoading(false));
    }, [])
    

    return(
        <main>
            <div className="selectionCategories">
                <div className="categoriesTitle">
                    <h1>Categories</h1>
                </div>
                    <div className="categorie">
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {categories.map(category => (
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
        </main>
    )
}

export default Categorie