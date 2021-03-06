import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import Landing from './components/Landing';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import SubcatProduct from './components/SubcatProduct';
import CatProducts from './components/CatProducts';
import Product from './components/Product';
import AlertTemplate from 'react-alert-template-basic';



const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
  
  
  return (
    <AlertProvider template={AlertTemplate} {...options}>

    <div className="App">
      
      <Router>
      <Navbar/>  
      <Switch>      
      <Route exact path='/' component={Landing}/>
      <Route exact path='/item/sub/:id' component={SubcatProduct}/>
      <Route exact path='/item/cat/:id' component={CatProducts}/>
      <Route exact path='/item/:id' component={Product}/>
      </Switch>
      
      </Router>
      
    </div>
    </AlertProvider>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(App);
