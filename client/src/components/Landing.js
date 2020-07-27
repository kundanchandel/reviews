import React from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import { setCurrentUser } from "../actions/authActions";

import "./Landing.css";
import Search from "./Search";
import Categories from "./Categories";
import Axios from "axios";

class Landing extends React.Component {
  state={
    products:[],
    groups:[],
    isLoaded:false
  }
  async componentDidMount() {
    await this.props.setCurrentUser();
    Axios.get('http://localhost:5000/product/allProducts').then(products=>{
      
      this.setState({products:products.data})
   //  const groups=_.groupBy(this.state.products,'category')
     const groups=_.chain(this.state.products).groupBy('category').map((value,key)=>({category:key,sub:value})).value()
      this.setState({groups:groups,isLoaded:true})

    })
  }
  
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    {
      if(this.state.isLoaded){
        return (
          <>
          <div className="head-strip"></div>  
        <Search/>
        <div className="container">
          <div className="row">
              <Categories groups={this.state.groups}/>
          </div>
        </div>
        </>
      );
      }else{
        return(
          <>
          <div className="head-strip"></div>  
          <Search/>
        
        </>
        )
      }
    }
    
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Landing);