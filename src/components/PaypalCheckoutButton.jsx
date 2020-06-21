import React,{ useEffect } from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'
import { useSelector, useDispatch } from 'react-redux'


const PaypalCheckoutButton = ({ order }) => {
    const dispatch = useDispatch()

    const paypalConf = {
        currency: 'USD',
        env: 'sandbox',
        client: {
            sandbox: 'Ae67rNCT9Gt7fPluBrYLae0rF9_w5owt0Xut_tDsG2km3Ghe_JdUDVJKTK5ZlvdRUEgVPujAnJcbeKCm',
            production: '----'

        },
        style: {
            label: 'pay',
            size: 'responsive',
            shape: 'rect',
            color: 'gold'
        }
    };


    const PayPalButton = paypal.Button.driver('react', { React, ReactDOM })

    const payment = (data, actions) => {
        const payment = {
            transactions: [
                {
                    amount: {
                        total: order.total,
                        currency: paypalConf.currency,
                    },
                    description: 'Compra en Test App',
                    custom: order.customer || '',
                    item_list: {
                        items: order.items
                    }
                }
            ],
            note_to_payer: 'Contactanos para cualquier aclaracion'
        };
        return actions.payment.create({ payment });
    };


    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
            .then(res => {
                dispatch({
                    type: 'SET_COMPRA',
                    payload: true
                })
                console.log(res)
                alert('el pago fue procesado correctamente' + res.id)
            })
            .catch(err => {
                console.log(err)
                alert('Ocurrio un error al procesar el pago')
            })
    };

    const onError = error => {
        console.log(error)
        alert('El pago no fue realizado, vuelva a intentarlo de nuevo')
    };

    const onCancel = (data, actions) => {
        alert('Pago no realizado, el usuario cancelado la transaccion')

    }


    return (
        <PayPalButton
            env={paypalConf.env}
            client={paypalConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale="es_MX"
        />
    )

    

    
   

}

export default PaypalCheckoutButton;