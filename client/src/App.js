import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import Landing from './components/Landing';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { Provider } from "react-redux";
import store from "./store";
import SubcatProduct from './components/SubcatProduct';
import CatProducts from './components/CatProducts';
import Product from './components/Product';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
       <Navbar/> 
      
      <Route exact path='/' component={Landing}/>
      <Route exact path='/dashboard' component={Dashboard}/> 
      <Route exact path='/product/sub/:id' component={SubcatProduct}/>
      <Route exact path='/product/cat/:id' component={CatProducts}/>
      <Route exact path='/product/:id' component={Product}/>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
