import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//firebase config
import { FirebaseAppProvider } from 'reactfire'
import firebaseConfig from './firebase-config'
import Loading from './components/Loading'
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<Loading/>}>
      <App />

    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

