import {createStore} from 'redux';

const initialState = {
    compraRealizada: false,
    order: {}
}

const reducer = (state = initialState, action) => {
    console.log(action.payload)

    switch (action.type){
        
        case 'SET_COMPRA':{
            console.log('compra realizada')
            return{
                compraRealizada: true
            }
        }
        case 'COMPRA_REALIZADA':{
    
            return{
                compraRealizada: false
            }
        }
        case 'DELETE_PRODUCT':{
            console.log('eliminando orden...')
            
            return{...state,order : action.payload}


           
        }
        case 'RECIBIR_ORDEN':{
            console.log("orden desde redux: "+ action.payload)
            let order= action.payload
            return{...state,order}
            
        }
        
        default:{
            return{
                compraRealizada: false
            }
        }
    }





    return state
}


const Store = createStore(reducer, initialState)

export default Store