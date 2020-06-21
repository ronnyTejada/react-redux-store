import React from 'react'
import '../css/logup.css'
import { Link } from 'react-router-dom';
import 'firebase/auth';



const Menu = () => {
    return (
        <section className="principal">
            <div className="form logup">
                <form action="#">
                    <label for=""><strong>Name:</strong>  </label><br />
                    <i className="fas fa-user-alt formi"></i>

                    <input type="email" name="email" id="" placeholder="Email"  />
                    <br />
                    <label for=""><strong>Email:</strong>  </label><br />
                    <i className="fas fa-envelope formi"></i>

                    <input type="email" name="email" id="" placeholder="Email" />
                    <br />
                    <label for="password"><strong>Password:</strong> </label><br />
                    <i className="fas fa-lock formi"></i>
                    <input type="password" name="password" id="" placeholder="Password" />
                    <br />
                    <i className="fas fa-sign-in-alt formi i"></i>
                    <input type="button" value="Login" style={{ marginRight: 15 }} />
                    <Link to={'/login'}>  Login</Link>

                </form>
            </div>
        </section>

    )
}

export default Menu;