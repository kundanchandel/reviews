import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import Landing from './components/Landing';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

import SubcatProduct from './components/SubcatProduct';
import CatProducts from './components/CatProducts';
import Product from './components/Product';


function App() {
  
  
  return (
    
    <div className="App">
      
      <Router>
      <Navbar/>  
      <Switch>      
      <Route exact path='/' component={Landing}/>
      <Route exact path='/dashboard' component={Dashboard}/> 
      <Route exact path='/item/sub/:id' component={SubcatProduct}/>
      <Route exact path='/item/cat/:id' component={CatProducts}/>
      <Route exact path='/item/:id' component={Product}/>
      </Switch>
      </Router>
    </div>
    
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(App);
