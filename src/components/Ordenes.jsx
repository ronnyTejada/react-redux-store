import React, { useState, useEffect } from 'react'
import '../css/Ordenes.css'
import { useFirebaseApp, useUser } from 'reactfire';

const Account = () => {
    const user = useUser();
    const [ordenes, setOrdenes] = useState([])
    const firebase = useFirebaseApp();

    const ref = firebase.database().ref('/ordenes/' + user.uid).orderByChild("id");


    async function getOrdenes() {
        let arr = []

        await ref.once('value', function (snapshot) {
            snapshot.forEach(function (child) {
                var data = child.val();
                
                arr.push({
                    date: data.date,
                    id: data.id,
                    items: data.items,
                    comprador: data.usuario,
                    total: data.total
                });





            });
        })
        setOrdenes(arr)
    }

    useEffect(() => {
        //get products from firebase bd 
        getOrdenes()

    }, [])





    return (
        <div className='container'>


        {ordenes.length === 0 &&
            <div>No hay ordenes</div>
        }
        {ordenes.length > 0 &&
            ordenes.map((orden, i) => {
                return (
    
                    <table key={i}>
                        <thead>
                            <tr>
                                <th> # </th>
                                <th>Nombre de Producto</th>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
    
                            </tr>
                        </thead>
                        <tbody>
                            {orden.items.map((item,i) => {
                                return (
                                    <tr>
                                        <td> {i} </td>
                                        <td>{item.nombre}</td>
                                        <td> ${item.precio} </td>
                                        <td> {item.cantidad} </td>
                                        <td> {orden.date} </td>
    
                                    </tr>
                                )
    
                            })}
    
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2"> Totales</td>
                                <td class="PrecioTotal"> ${orden.total} </td>
    
                            </tr>
    
                        </tfoot>
                    </table>
                )
            })

        }
        </div>
        
        
    )
}

export default Account;