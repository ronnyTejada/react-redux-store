import React, { Component } from 'react';
import { BrowserRouter, Router, Switch, Route, Redirect } from 'react-router-dom';

import Menu from './components/Menu';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartLogout from './components/CartLogout';

import Account from './components/Account';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import ProductView from './components/ProductView';
import {useUser} from 'reactfire'



const MyRouter =()=> {
    
       
        let user = useUser()

        return (
            <BrowserRouter>
                <Menu />
                {/*configurar rutas */}

                <Switch>
                    {user && 
                        <Route exact path="/" render={
                            ()=>{return <Redirect to='/products/1'/>}
                        } />

                    
                    }
                    {!user && 
                        <Route exact path="/" render={
                            ()=>{return <Redirect to='/login'/>}
                        } />

                    
                    }
                    <Route exact path="/products/:page" render={
                        (props) => {
                            const page = parseInt(props.match.params.page);
                           
                            return <ProductList  page={page} />

                        }
                    } />
                    
                    {user &&
                        <Route exact path="/cart" component={Cart} />
                    
                    }
                    {!user &&
                        <Route exact path="/cart" component={CartLogout} />

                    }
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />

                    <Route exact path="/product/detail/:id" render={
                        props => {
                            const index = parseInt(props.match.params.id);
                            return <ProductView index={index}/>
                        }
                    } />



                    <Route component={Error} />



                </Switch>



            </BrowserRouter>
        )
    }







export default MyRouter;