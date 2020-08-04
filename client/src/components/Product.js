import React, { useState, useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import "./Product.css";
import ReviewCard from "./ReviewCard";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import ProgateLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 30vh auto;
  border-color: red;
`;

function Product({ match, auth }) {
  const { isAuthenticated, user } = auth;
  const productID = match.params.id;
  const user_id = auth.user._id;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(5);
  const [singleProduct, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvg] = useState(0);
  const [totalComments, setTotal] = useState(0);

  useEffect(() => {
    Axios.get(`http://localhost:5000/product/${productID}`).then((product) => {
      console.log(product.data);
      setProduct(product.data.product);
      setAvg(product.data.ratingAverage);
      setTotal(product.data.totalComments);
      setLoading(false);
    });
  }, []);

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      commentTitle: title,
      fullComment: desc,
      rating: rating,
      user_id: user_id,
      user_name: user.displayName,
    };
    console.log(newComment);
    Axios.post(`http://localhost:5000/comment/${productID}`, newComment).then(
      (res) => {
        console.log(res.data);
        alert("comment added successfully")
        setTitle('')
        setDesc('')
        setRating(5)
        setLoading(true)
        Axios.get(`http://localhost:5000/product/${productID}`).then((product) => {
      console.log(product.data);
      setProduct(product.data.product);
      setAvg(product.data.ratingAverage);
      setTotal(product.data.totalComments);
      setLoading(false);
    }); 
      }
    );

    
  };

  const handleDelete=(id)=>{
    Axios.delete(`http://localhost:5000/comment/${id}`).then(res=>{
      alert("comment deleted successfully")
      setLoading(true)
      Axios.get(`http://localhost:5000/product/${productID}`).then((product) => {
      console.log(product.data);
      setProduct(product.data.product);
      setAvg(product.data.ratingAverage);
      setTotal(product.data.totalComments);
      setLoading(false);
    }); 
    })
  }
  const reviewSubmit = (
    <div className="inputReview">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title your review"
          required
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          maxLength="60"
        />
        <textarea
          maxLength="400"
          placeholder="Write your review and your experience"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br />
        <button>Submit review</button>
      </form>
    </div>
  );
  const authfirst = (
    <div className="inputReview">
      <a className="nav-link" href="/auth/google">
        <button>Login first to submit review</button>
      </a>
    </div>
  );
  if (loading) {
    return (
      <div className="sweet-loading">
        <ProgateLoader
          css={override}
          size={25}
          color={"#9ACC55"}
          loading={loading}
        />
      </div>
    );
  } else {
    return (
      <div className="reviewPage">
        <div className="top">
          <div className="row content">
            <div className="col-sm-6 col-md-4 avatar">
              <img
                src="https://www.10xfactory.com/imager/general/1028/tai-lopez-420x320-20190308_6f16da50af95e8511ca2a9e6a50991c9.jpg"
                alt="avatar"
              />
            </div>

            <div className="col-sm-6 col-md-4  intro">
              <h2>{singleProduct.productName}</h2>
              <h3>{totalComments} Reviews</h3>
              <br />
              <div className="rating">
                <span>{avgRating}</span>
                <StarRatings
                  rating={avgRating}
                  starRatedColor="orange"
                  starDimension="25px"
                  starSpacing="5px"
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-4  contactInfo">
              <a href={singleProduct.website}>
                {" "}
                Visit: {singleProduct.website}
              </a>
              <div className="row visitNow">
                <a href={singleProduct.website}>
                  <h5>Visit Now</h5>
                </a>
              </div>
              <h5>{singleProduct.moto}</h5>
              <div className="row icons">
                <div className="col-6">
                  <a href="instagram">
                    <FaFacebookSquare />
                  </a>
                </div>
                <div className="col-6">
                  <a href="facebook">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="mainContent">
            <div className="review">
              <h1>Rate Your Experience</h1>
              <br />
              <span>{rating}</span>
              <StarRatings
                rating={rating}
                starRatedColor="orange"
                starDimension="25px"
                starSpacing="5px"
                changeRating={changeRating}
              />
            </div>

            <div className="inputReview">
              <br />
              {isAuthenticated ? reviewSubmit : authfirst}
            </div>

            <div className="description">
              <h1>DESCRIPTION</h1>
              <h5>{singleProduct.productDescription}</h5>
            </div>

            {/* Dummy data for card */}
            {singleProduct.comments.map((comment) => {
              return (
                <ReviewCard
                  key={comment._id}
                  onDelete={handleDelete}
                  image={
                    "https://www.10xfactory.com/imager/general/1028/tai-lopez-420x320-20190308_6f16da50af95e8511ca2a9e6a50991c9.jpg"
                  }
                  name={comment.authorName}
                  rating={comment.rating}
                  title={comment.commentTitle}
                  description={comment.fullComment}
                  comment={comment}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Product);
