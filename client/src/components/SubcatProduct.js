import React, { useState, useEffect } from "react";
import Axios from "axios";
import SIngleProduct from "./SIngleProduct";
import {connect} from 'react-redux';
import { setCurrentUser } from "../actions/authActions";
import ProgateLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";
import Footer from "./Footer";

const override = css`
  display: block;
  margin: 30vh auto;
  border-color: red;
`;

function SingleProduct({ match,setCurrentUser }) {
  const [productsCatwise, setProdcuts] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    setCurrentUser();
    Axios.get(
      `/product/subcatwise/${match.params.id}`
    ).then((products) => {
      setProdcuts(products.data);
      setLoading(false);
    });
  }, []);
if(loading){
  return(
  <div className="sweet-loading">
        <ProgateLoader
          css={override}
          size={25}
          color={"#9ACC55"}
          loading={loading}
        />
      </div>
  )
}else{
  return (  
    <div className="container">
      <div className="row latest_review_top">
          <div className="col-12">
            <h2>Mentors Reviews</h2>
          </div>
          <div className="col-12">
            <h6>all mentors under category {`"${productsCatwise[0].subCategory}"`} </h6>
          </div>
        </div>
        <div className="row">
          {productsCatwise.map((product) => {
            return <SIngleProduct  key={product._id} product={product} />;
          })}
        </div>
        <Footer/>
    </div>
        
  );
        }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setCurrentUser })(SingleProduct);