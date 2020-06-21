import 'firebase/database'
import 'firebase/auth';

import firebase from 'firebase/app';
var arr = []
async function getProducts() {
    const ref = firebase.database().ref('/user/' + '8QafTdYpfCRtKCUnfEWIjEb3g8I2').orderByChild("_id")
    
    let o =1
    await ref.once('value', function(snapshot){
        snapshot.forEach(function(child){
            var data = child.val();
        
            arr.push({
                id: data._id,
                nombre: data.producto,
                precio: data.precio,
                cantidad: data.cantidad
            });
        });
    })

    
}


export default arr
