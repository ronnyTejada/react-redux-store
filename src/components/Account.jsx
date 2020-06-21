import React from 'react'
import '../css/account.css'
import { useUser } from 'reactfire';
import { Redirect } from 'react-router-dom';
import Ordenes from './Ordenes'
const Account = () => {
    const user = useUser();

    return (
        <section className="principal-account">
            {user &&

                <React.Fragment>
                    
                <div className="dashboard">
                    <div className="adorno">
                        <p>user</p>
                        <div className="s"></div>
                    </div>
                    <i className="fas fa-user-alt"></i>

                    <h1 className="username">{user.email}</h1>

                </div>


               <Ordenes/>
              

                </React.Fragment>




            }
            {!user &&
                <Redirect to={"/login"}></Redirect>


            }

        </section>
    )
}

export default Account;