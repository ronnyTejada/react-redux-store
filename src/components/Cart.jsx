import React, { useState, useEffect, Suspense } from 'react'
import 'firebase/database'
import 'firebase/auth';
import '../css/cart.css'

import PaypalCheckoutButton from './PaypalCheckoutButton'
import { useFirebaseApp, useUser } from 'reactfire';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { Redirect } from 'react-router-dom';
import moment from 'moment'

const Cart = () => {
    const dispatch = useDispatch()

    let arr = []
    let aux = []
    let sub = 0
    
    const [items, setItems] = useState()
    const [redirect, setRedirect] = useState(false)
    const [products, setProducts] = useState([]);
    const [eliminado, setEliminado] = useState(0);
    const [subTotal, setSubTotal] = useState(0.00)
    const [loading, setLoading] = useState(true)
    const user = useUser();
    const firebase = useFirebaseApp();
    const compraRealizada = useSelector((state) => state.compraRealizada)
    const order = useSelector((state) => state.order)



    const ref = firebase.database().ref('/carrito/' + user.uid).orderByChild("id");



    //obtener productos desde firebase
    async function getProducts() {
        let item = []
        let orden

        await ref.once('value', function (snapshot) {
            snapshot.forEach(function (child) {
                var data = child.val();
                sub += data.cantidad * parseFloat(data.precio)
                setSubTotal(sub.toString())
                arr.push({
                    id: data.id,
                    nombre: data.producto,
                    precio: data.precio,
                    imagen: data.imagen,
                    cantidad: data.cantidad
                });
                let precio = data.precio.toString()
                item.push({
                    sku: data.id,
                    name: data.producto,
                    price: precio,
                    quantity: data.cantidad,
                    currency: 'USD'

                });
                setItems(items)
                orden = {
                    customer: user.uid,
                    total: sub.toString() + '.' + '00',
                    items: item
                };



            });
        })
        setProducts(arr)
        setLoading(false)
        let o = { id: '2', name: 'dw' }
        dispatch({
            type: 'RECIBIR_ORDEN',
            payload: orden
        })




    }


    

    //eliminar productos en la bd de firebase haciendo click en el boton delete
    async function deleteProduct(id, index, precio, cantidad) {
        await firebase.database().ref('/carrito/' + user.uid + '/' + id).remove()
        products.splice(index, 1)
        setProducts(products)
        setEliminado(id)
        setSubTotal(subTotal - (cantidad * precio))


        if (order !== null) {
            delete order['items'].splice(index, 1)
            if (order['items'].length === 0) {
                dispatch({
                    type: 'DELETE_PRODUCT',
                    payload: 'vacio'
                })

            }

        }



    }
    useEffect(() => {
        //get products from firebase bd 
        getProducts()
                    
       
    }, [])

    //cuando se realiza la compra
    //borra los productos de la BD y muestra una alerta
    //guardar la orden en la bd
    if (compraRealizada) {
        firebase.database().ref('/carrito/' + user.uid).remove()
       
        var key = firebase.database().ref().child('carrito').push().key;
        let ordenes = {
            id: key,
            date: new Date(),
            total: subTotal,
            usuario: user.email,
            items:products
           
        }
        

        const ref = firebase.database().ref('/ordenes/' + user.uid);
        let dt = new Date()
        let date = moment(dt).format("MMM Do YY");   
        ref.push({
            id: key,
            date: date,
            total: subTotal,
            usuario: user.email,
            items:products
        })
        
        swal("Compra Exitosa", "Click en el botton!", "success");
        setRedirect(true)
        dispatch({
            type: "COMPRA_REALIZADA",
            payload: false
        })

       
    }



    



    return (

        <section className="principal-cart">
            
            {redirect &&
            //hace un redirect a account cuando se realiza la compra
                <Redirect to='account/' />
            }
            <div className="cart">
                {loading &&
                    <div className="cart-dash">
                        <span className='icon'><i className="fas fa-shopping-basket"></i>
                        </span>
                        <h4>Loading...</h4>

                    </div>

                }
                {products.length === 0 && loading === false &&

                    <div className="cart-dash">
                        <span className='icon'><i className="fas fa-shopping-basket"></i>
                        </span>
                        <h4>No hay Productos en tu carrito, Agrega algunos!</h4>
                        <Link to={"products/1"} className="linkLogin">View Products</Link>
                    </div>




                }

                <br />
                {products.length > 0 && loading === false &&

                    products.map((p, index) => {




                        return (
                            <div className="cart-dash-items" key={index}>

                                <div className="cart-item-img">
                                    <img src={p.imagen} alt="" />
                                    <br />
                                </div>
                                <div className="content">
                                    <h2 id="item-t">{p.nombre}</h2>
                                    <p id="item-p">{p.cantidad}X{p.precio}</p>
                                    <button id="item-b" className="btnDelete" onClick={() => deleteProduct(p.id, index, p.precio, p.cantidad)}  ><i class="fas fa-trash-alt"></i></button>
                                </div>

                            </div>

                        )


                    })



                }
                <div className="sub">
                    <p><strong>Sub total: </strong>{subTotal}.00$</p>
                    {order && 
                        
                        <PaypalCheckoutButton order={order}  />
            
                    }
                    {!order &&
                        <button disabled>Checkout</button>

                    }
                    



                </div>

            </div>
        </section >

    )


}


export default Cart;
