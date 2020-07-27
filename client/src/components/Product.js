import React, { useState,useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import StarRatings from 'react-star-ratings';
import './Product.css';
function Product({ match, auth }) {
  const productID = match.params.id;
  const user_id = auth.user._id;
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(5);
  const [singleProduct, setProduct] = useState({});
  const [loading,setLoading]=useState(false);
  const [avgRating,setAvg]=useState(0);
  const [totalComments,setTotal]=useState(0);
  
  
  useEffect(() => {
      Axios.get(`http://localhost:5000/product/${productID}`).then(product=>{
          console.log(product.data)
          setProduct(product.data.product)
          setAvg(product.data.ratingAverage)
          setTotal(product.data.totalComments);
          setLoading(true);
          
          
      })

      
  }, [])
  
  const changeRating=( newRating, name )=> {
    setRating(newRating)  
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      commentTitle: title,
      fullComment: desc,
      rating: rating,
      user_id: user_id,
      user_name:auth.user.displayName
    };
    console.log(newComment);
    Axios.post(`http://localhost:5000/comment/${productID}`, newComment).then(
      (res) => {
        console.log(res.data);
      }
    );
  };
  if(!loading){
    return <div>...loading</div>
  }
  else{
  return (
    <div className="productReview">
      <div className="container top">
        <div className="row">
          <div className="col-xs-12 col-md-8 brand">
            <div className="row">
              <div className="col-6">
                <div className="image">
                  <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/58f0eeb10000ff0005a07b1e/0x0.png" />
                </div>
              </div>
              <div className="col-6">
                <h2>Moonsite</h2>
                <p>Excellent</p>
                <StarRatings
                  rating={avgRating || 0}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="5px"
                />
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-md-4 visitSite">
            <a href="https://www.moonsitesolutions.tech">
              www.moonsitesolutions.tech <br />
              visit site
            </a>
          </div>
        </div>
      </div>

      <div className="container review">
        <div className="row  add_review">
          <div className="col-4">
            <img src="https://images.unsplash.com/photo-1595848426977-b5df510c4bab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></img>
          </div>
          <div className="col-4">
          <div class="container">
  
  
  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Give a review</button>

  
  <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
      
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Add a review</h4>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
          <StarRatings
          rating={rating}
          starRatedColor="blue"
          changeRating={changeRating}
          numberOfStars={5}
          name='rating'
        />  
          <label>title</label>  
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="title"/><br/>
          <input value={desc} onChange={(e)=>setDesc(e.target.value)}placeholder="review description"/><br/>
           <button type="submit">sbit</button>
          </form>
          <button type="button" class="btn btn-default" data-dismiss="modal">close</button>
        </div>
        
         
        
      </div>
      
    </div>
  </div>
  
</div>

          </div>
          <div className="col-4">
            <StarRatings
              rating={5}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="5px"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row main">
            {
                 singleProduct.comments.map(comment=>{
                     return(
                        <div   key={comment._id} className="col-xs-12 col-md-7">
                        <div className="row">
                          <div className="col-12 review_card">
                            <div className="row card_top">
                              <div className="col-4">
                                <img src="https://images.unsplash.com/photo-1595848426977-b5df510c4bab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></img>
                              </div>
                              <div className="col-8">Name of reviewer</div>
                            </div>
            
                            <hr />
            
                            <div className="row card_review">
                              <StarRatings
                                rating={comment.rating}
                                starRatedColor="orange"
                                starDimension="20px"
                                starSpacing="5px"
                              />
                            </div>
            
                            <div className="row card_content">
                     <h2>{comment.commentTitle}</h2>
                              <p>
                                {comment.fullComment}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                     )
                 })   
            }
          

          <div className="col-xs-12 col-md-4 desc">
            <h2>Moonsite Solutions</h2>
            <p>
              Murray Resources is an award-winning, Houston-based recruiting and
              staffing firm. For over 30 years we've helped high-performance
              organizations–including numerous Fortune 1000 companies–build
              their teams. Our quality-focused recruiting consultants utilize a
              comprehensive evaluation and assessment process to match top
              companies with the best talent, quickly and efficiently.
            </p>
          </div>
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
