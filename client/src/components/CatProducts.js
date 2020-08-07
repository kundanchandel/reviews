import React, { useState, useEffect } from "react";
import Axios from "axios";
import SIngleProduct from "./SIngleProduct";
import { setCurrentUser } from "../actions/authActions";
import {connect} from 'react-redux';

function CatProducts({ match,setCurrentUser }) {
  const [catproducts, setcatproducts] = useState([]);
  useEffect(() => {
     setCurrentUser();
    Axios.get(`/product/cat/${match.params.id}`).then(
      (product) => {
        setcatproducts(product.data);
      }
    );
  }, []);
  return (
    <div className="container">
       <div className="row">
        {catproducts.map((product) => {
          return <SIngleProduct key={product._id} product={product} />;
        })}
      </div>
    </div>
    
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setCurrentUser })(CatProducts);