import React, { useState, useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import ReviewCard from "./ReviewCard";
import { FaFacebookSquare, FaInstagram, FaLink } from "react-icons/fa";
import ProgateLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";
import { setCurrentUser } from "../actions/authActions";

const override = css`
  display: block;
  margin: 30vh auto;
  border-color: red;
`;

function Product({ match, auth,setCurrentUser }) {
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
  
  useEffect(async() => {
    setCurrentUser();   
    Axios.get(`/product/${productID}`).then((product) => {
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
      user_photo:user.photo
    };
    console.log(newComment);
    Axios.post(`/comment/${productID}`, newComment).then(
      (res) => {
        console.log(res.data);
        alert("comment added successfully")
        setTitle('')
        setDesc('')
        setRating(5)
        setLoading(true)
        Axios.get(`/product/${productID}`).then((product) => {
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
    Axios.delete(`/comment/${id}`).then(res=>{
      alert("comment deleted successfully")
      setLoading(true)
      Axios.get(`/product/${productID}`).then((product) => {
      console.log(product.data);
      setProduct(product.data.product);
      setAvg(product.data.ratingAverage);
      setTotal(product.data.totalComments);
      setLoading(false);
    }); 
    })
  }
  const reviewSubmit = (
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
        <button className="submitReview">Submit review</button>
      </form>
  );

  const authfirst = (
    <button type="button" className="btn">
      <a className="nav-link" href="/auth/google">
        Login first to submit review
      </a>
    </button>
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
            <div className="col-12 col-sm-6 col-md-4 avatar">
              <img
                src="https://www.10xfactory.com/imager/general/1028/tai-lopez-420x320-20190308_6f16da50af95e8511ca2a9e6a50991c9.jpg"
                alt="avatar"
              />
            </div>

            <div className="col-12 col-sm-6 col-md-4  intro">
              <h2>{singleProduct.productName}</h2>
              <h3>{totalComments} Reviews</h3>
              <br />
              <div className="row rating">
                <div className="col-2">
                <span>{avgRating.toFixed(1)}</span>
                </div>
                <div className="col-10">
                <StarRatings
                  rating={avgRating}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="5px"
                />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-4  contactInfo">
              <h6>
                <a href={singleProduct.website}>
                    {" "}
                    Visit: {singleProduct.website}
                </a>
              </h6>
              <h5>{singleProduct.moto}</h5>
              <div className="row icons">
                <div className="col-4">
                  <a href={singleProduct.website}>
                    <FaLink />
                  </a>
                </div>
                <div className="col-4">
                  <a href="instagram">
                    <FaFacebookSquare />
                  </a>
                </div>
                <div className="col-4">
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
              <h2>Rate Your Experience</h2>
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
              <h2>DESCRIPTION</h2>
              <h5>{singleProduct.productDescription}</h5>
            </div>

            {/* Dummy data for card */}
            {singleProduct.comments.map((comment) => {
              return (
                <ReviewCard
                  key={comment._id}
                  onDelete={handleDelete}
                  image={comment.authorPhoto}
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

export default connect(mapStateToProps, {setCurrentUser})(Product);
