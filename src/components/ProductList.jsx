import React, {useState} from 'react'
import '../css/style.css'
import Pagination from './Pagination';
import products from '../Products'
import { Link } from 'react-router-dom';



const ProductList = ({page}) => {

    const [productsPerPage, setproductsPerPage] = useState(9)
    const [currentPage, setCurrentPage] = useState(parseInt(page))
   
    const indexOfLastProducts =  currentPage * productsPerPage
    const indexOfFirstProducts = indexOfLastProducts - productsPerPage
    const currentProducts = products.slice(indexOfFirstProducts, indexOfLastProducts)
   
    

    const paginate = pageNumber => setCurrentPage(pageNumber);


    
    
    return (
        <div className="wrap">
            <section className="principal">
                <div className="products">
                    
                   
                    {currentProducts.map((p,i) => {
                        return (
                            <Link className="link" to={"/product/detail/"+p.id}>
                            <div className="product" key={i}>
                                
                                
                                    <div className="img">
                                        <img src={p.img} alt={p.title} loading='lazy' />

                                    </div>
                                    <div className="product-info">
                                        <h5 className="product-title">{p.title}</h5>
                                        <p className="product-price">{p.price}$</p>
                                    </div>
                                
                            </div>
                            </Link>
                        )

                    })}

                </div>
            </section>

            <Pagination productsPerPage={productsPerPage} totalProducts = {products.length} paginate={paginate} page={page}/>
        </div>
    )
}

export default ProductList;