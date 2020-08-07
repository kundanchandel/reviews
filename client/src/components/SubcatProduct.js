import React, { useState, useEffect } from "react";
import Axios from "axios";
import SIngleProduct from "./SIngleProduct";
import {connect} from 'react-redux';
import { setCurrentUser } from "../actions/authActions";

function SingleProduct({ match,setCurrentUser }) {
  const [productsCatwise, setProdcuts] = useState([]);
  useEffect(async() => {
    setCurrentUser();
    Axios.get(
      `/product/subcatwise/${match.params.id}`
    ).then((products) => {
      setProdcuts(products.data);
    });
  }, []);

  return (
    <div className="row">
      {productsCatwise.map((product) => {
        return <SIngleProduct  key={product._id} product={product} />;
      })}
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setCurrentUser })(SingleProduct);