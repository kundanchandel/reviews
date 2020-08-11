import React, { useState, useEffect } from "react";
import Axios from "axios";
import SIngleProduct from "./SIngleProduct";
import { setCurrentUser } from "../actions/authActions";
import {connect} from 'react-redux';
import ProgateLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";
import Footer from "./Footer";

const override = css`
  display: block;
  margin: 30vh auto;
  border-color: red;
`;

function CatProducts({ match,setCurrentUser }) {
  const [catproducts, setcatproducts] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
     setCurrentUser();
    Axios.get(`/product/cat/${match.params.id}`).then(
      (product) => {
        setcatproducts(product.data);
        setLoading(false);
      }
    );
  }, []);

  if(loading){
    return(
    <div className="sweet-loading">
          <ProgateLoader
            css={override}
            size={25}
            color={"#85bc38"}
            loading={loading}
          />
        </div>
    )
  }else{
  return (
    <div className="container">
      <div className="row latest_review_top">
          <div className="col-12">
            <h2>Latest Reviews</h2>
          </div>
          <div className="col-12">
            <h6>all mentors under category {`"${catproducts[0].category}"`}</h6>
          </div>
        </div>
       <div className="row">
        {catproducts.map((product) => {
          return <SIngleProduct key={product._id} product={product} />;
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

export default connect(mapStateToProps, { setCurrentUser })(CatProducts);