import React from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import './latestReview.css'

export default function FeaturedProduct({ products }) {

  const products2 = products.slice(0,3);
  return (
    <div>
      <div className="container latest_review">
        <div className="row latest_review_top">
          <div className="col-12">
            <h2>Featured Products</h2>
          </div>
          <div className="col-12">
            <h6>Products which are featured this week</h6>
          </div>
        </div>
        <div className="row">
          {products2.map((product) => {
            return (
              <div key={product._id} className="col-12 col-md-6 col-lg-4 p-5">
                <Link to={`/item/${product._id}`} style={{color:"grey",textDecoration:"none"}}>
                  <div className="card productcard">
                    <img
                      className="card-img-top"
                      src={product.photoUrl}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <StarRatings
                        rating={3.55}
                        starRatedColor="orange"
                        starDimension="20px"
                        starSpacing="5px"
                      /><span>({product.comments.length})</span>
                      <h5 className="card-title">{product.productName}</h5>
                      
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">{product.category}</small>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
