// Comment out this if you have to use redux
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import "bootstrap/dist/css/bootstrap.min.css";
// import "semantic-ui-css/semantic.min.css";

ReactDOM.render( 
    <App/>, 
document.getElementById('root'));

// =========================================================================================================
// to use redux , uncomment this out

// import React from 'react';
// import ReactDOM from 'react-dom';
// import Practice from './reactRouterProject/App';
// // store
// import { createStore } from "redux"
// // provider
// import { Provider } from "react-redux"
// // reducer
// import rootReducer from "./reactRouterProject/reducer/rootReducer"

// const store = createStore(rootReducer);

// ReactDOM.render( 
//     <Provider store={store}><Practice/></Provider>, 
// document.getElementById('root'));

// ===================================================================================================
// redux for dev ed
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Practice from './react-redux-product-compute/App';
// // store
// import { createStore } from "redux"
// // provider
// import { Provider } from "react-redux"
// // reducer 
// // import rootReducer from "./react-redux-product-compute/reducer/rootReducer"
// // combined reducer 
// import rootReducer from "./react-redux-product-compute/reducer/rootReducer"

// const store = createStore(rootReducer);

// ReactDOM.render( 
//     <Provider store={store}><Practice/></Provider>, 
// document.getElementById('root'));

