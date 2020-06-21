import React, { useState, useEffect } from 'react';
import products from '../Products'
import '../css/product.css'
import 'firebase/database'
import { useFirebaseApp, useUser } from 'reactfire';
import swal from 'sweetalert'

const ProductView = (index) => {

    let i = Object.values(index)
    const [cantidad, setCantidad] = useState(1)
    const [productoExistente, setProductoExistente] = useState({})
    const [existe, setExiste] = useState(false)

    const firebase = useFirebaseApp();
    const user = useUser()
    let currenValue = 1

    let product = products[i[0]]
    useEffect(() => {
        //get products from firebase bd 




        //validar si el producto existe en el carrito
        const ref = firebase.database().ref('/carrito/' + user.uid).orderByChild("id");
        ref.on("child_added", (Data) => {
            let d = Data.val()
            console.log(d)
            if (d.producto === product.title) {
                console.log('id:'+ d.id)
                setExiste(true)
                setProductoExistente({
                    cantidad: d.cantidad,
                    id: d.id,
                    imagen: d.imagen, 
                    precio: d.precio,
                    producto: d.producto,
                    usuario: d.usuario
                })
            }
        })



    }, [])

    const addToCart = () => {

        if (existe) {
            const ref = firebase.database().ref('/carrito/' + user.uid + '/' + productoExistente.id);

            ref.set({ 
                cantidad: cantidad + productoExistente.cantidad, 
                id: productoExistente.id, 
                imagen: productoExistente.imagen, 
                precio: productoExistente.precio, 
                producto: productoExistente.producto, 
                usuario: productoExistente.usuario }).then().catch();

            swal("Producto Agregado", "Revisa tu Carrito", "success");


        } else {
            //agregar productos al carrito por primera vez
            var key = firebase.database().ref().child('carrito').push().key;

            let producData = {
                id: key,
                producto: product.title,
                precio: product.price,
                usuario: user.email,
                cantidad: cantidad,
                imagen: product.img,
            }

            let updates={};

            updates['/carrito/'+user.uid+'/'+key]=producData;
            swal("Producto Agregado", "Revisa tu Carrito", "success");

            return firebase.database().ref().update(updates);












            /*firebase.database().ref('/user/' + user.uid).push({
                


            });*/
        }


    }


    const getCantidad = (e) => {
        setCantidad(parseInt(e.target.value))
        console.log(cantidad)

    }


    return (
        <div>
            <section className="principal-detail">
                <div className="product-info-2">
                    <div className="img-p">
                        <img className="img-p" src={product.img} alt="" />
                    </div>
                    <div className="product-i">
                        <h2>{product.title}</h2>
                        <p>{product.price}$</p>
                        <input type="number" min="1" placeholder="Cuantos Quieres?" onChange={getCantidad} />

                        <input type="button" defaultValue="add tu card" onClick={addToCart} />
                    </div>
                </div>
            </section>
            <section className="description">
                <div>
                    <h3>About this product</h3>
                    <p>Hold up, Brain just did it with this new, exclusive 'B.R.A.I.N.' Hoodie!
                    100% cotton pullover hoodie
                    Black pullover hoodie with multi-colored ink print on front
                    Featuring the 'B.R.A.I.N.' design from Brain
              What is your brain even saying?  It's saying to get this hoodie today!</p>
                </div>
            </section>
        </div>
    )
}

export default ProductView