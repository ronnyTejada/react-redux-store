import React, { useState } from 'react'
import '../css/style.css'
import { Link } from 'react-router-dom';

const Pagination = ({ productsPerPage, totalProducts, paginate, page }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    console.log(page)
    paginate(page)

    return (
        <section className="sec-pagination ">
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <Link onClick={() => paginate(number)} to={'/products/'+number} className='page-link'>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Pagination;