import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import { connect } from "react-redux";

import "./reviewCard.css";
import Reply from "./Reply";
function ReviewCard({
  isAuthenticated,
  image,
  name,
  rating,
  title,
  description,
  comment,
  auth,
  onDelete,
  replys,
  submitReply,
  deleteReply
}) {
  const [reply, setReply] = useState("");
  const [replyVisibility, setReplyVisibilty] = useState(false);
  
  const replyForm = (
    <form className="input-group m-auto" onSubmit={(e)=>{
      e.preventDefault();
      submitReply(reply,comment._id)
      setReply('');
    }}>
      <input
        onChange={(e)=>setReply(e.target.value)}
        type="text"
        className="form-control"
        value={reply}
        placeholder="Reply on the comment"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="submit">
          Reply
        </button>
      </div>
    </form>
  );
  function handelReplyChange() {
    setReplyVisibilty(!replyVisibility);
  }
  return (
    <div className="row reviewCard">
      <div className="row cardTop">
        <div className="col-3 col-sm-2 col-md-1 avatar">
          <img alt="avatar" src={image} />
        </div>
        <div className="col-8">
          <div className="row">
            <h5 style={{ marginBottom: "0 !important" }}>{name}</h5>
          </div>
          <div className="row">
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="5px"
            />
          </div>
        </div>
        <div className="col-1 mb-2">
            {auth.user._id === comment.author ? (
              <button className="delete" onClick={() => onDelete(comment._id)}>
                <FaRegTrashAlt/>
              </button>
            ) : (
              ""
            )}
          </div>


      </div>
      <div className="row content pt-3">
        <div className="row pl-5">
          <h6>{title}</h6>
        </div>
        <div
          className="row pl-5"
          style={{ borderBottom: "1px solid lightgrey", marginBottom: "5px" }}
        >
          <p>{description}</p>
        </div>
        <hr />
        <div className="row iconRow pl-3">
          <div className="col-2">
            <button onClick={() => handelReplyChange()}>
              <BsChat /> {`(${replys.length})`}
            </button>
          </div>
         
        </div>

        {replyVisibility && isAuthenticated && replyForm}
        {replyVisibility &&
          replys.map((reply) => {
            return (
              <Reply
                id={reply._id}
                deleteReply={deleteReply}
                key={reply._id}
                name={reply.authorName}
                photo={reply.authorPhoto}
                date={reply.createdAt}
                data={reply.reply}
                author={reply.author}
                auth={auth}
              />
            );
          })}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ReviewCard);
