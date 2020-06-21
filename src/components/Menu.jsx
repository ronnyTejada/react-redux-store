import React from 'react'
import '../css/style.css'
import { Link } from 'react-router-dom';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import store from '../static/store.svg'
const Menu = () => {
    const user = useUser();
    const firebase = useFirebaseApp();

    const logout = async () => {
        await firebase.auth().signOut();
    }

    return (
        <header>
            <nav className="menu">
                <ul className="list-menu">
                    {user &&
                        <React.Fragment>
                            <img src={store} className="iconMenu" />
                            <li><span><Link to={'/products/1'} className='link-m'>ReactStore</Link> </span></li>
                        </React.Fragment>

                    }
                    {!user &&
                        <React.Fragment>
                            <img src={store} className="iconMenu" />
                            <li><span><Link to={'/login'} className='link-m'>ReactStore</Link> </span></li>
                        </React.Fragment>
                    }

                    <li><span><Link to={'/cart'} className='link-m'> <i className="fas fa-shopping-cart"></i>Cart</Link> </span></li>
                    {user &&
                        <React.Fragment>
                            <li><span><Link to={"/account"} className='link-m'><i className="fas fa-user-alt"></i>Account</Link> </span></li>

                            <li onClick={logout}><span><Link to={'/login'} className='link-m'><i className="fas fa-sign-out-alt"></i>Logout</Link> </span></li>
                        </React.Fragment>
                    }
                    {!user &&

                        <React.Fragment>
                            <li><span><Link to={'/login'} className='link-m'><i className="fas fa-sign-out-alt"></i>Login</Link> </span></li>

                            <li><span><Link to={'/login'}className='link-m'><i className="fas fa-user-plus"></i>Singup</Link> </span></li>
                        </React.Fragment>


                    }
                </ul>
            </nav>
        </header>
    )
}

export default Menu;