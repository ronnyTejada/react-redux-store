import React, { useState, useEffect } from 'react'
import '../css/cart.css'
import 'firebase/database'
import 'firebase/auth';

import { Link } from 'react-router-dom';



const CartLogout = () => {
    
    //este componente sera renderizado cuando el usuario este logout

    return (
        <section className="principal">
            <div className="cart">
        

                    <div className="cart-dash">
                        <span className='icon'><i class="fas fa-shopping-basket"></i>
                        </span>
                        <h4>No hay Productos en tu carrito, Agrega algunos!</h4>
                        <Link to={'login'} className="linkCart">Click para ingresar</Link>
                    </div>

                <div className="sub">
                    <p><strong>Sub total: </strong>0.00$</p>
                    <button disabled>Checkout</button>

                </div>

            </div>
        </section>
    )


}


export default CartLogout;
