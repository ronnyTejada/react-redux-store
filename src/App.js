import React from 'react';


import Menu from './components/Menu'
import ProduList from './components/ProductList'
import Router from './Router';
import {Provider} from 'react-redux'
import Store from './Store'

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <Router/>
    </div>
    </Provider>
  );
}

export default App;
