import React, { useRef, useState } from "react";
import NameDate from "../NameDate";
const CommentDialog = React.forwardRef((props, ref) => {
  const [comments, setcomments] = useState(props.comments);
  const [error, seterror] = useState("");
  const commentValue = useRef("");
  const handleComment = () => {
    if (commentValue.current.innerText === "") {
      seterror("Enter a valid comment");
    } else {
      seterror("");
      const date = new Date();
      const realdate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      props.addComment(props.blogId, commentValue.current.innerText, realdate);
      const comment = {
        username: props.name,
        commenterImg: props.img,
        date: realdate,
        commentcontent: commentValue.current.innerText,
      };
      const allcomments = [comment, ...comments];
      setcomments(allcomments);
      commentValue.current.innerText = "";
    }
  };
  return (
    <div ref={ref} className="commentDialogMain display-none  ">
      <div className="commentDialog transform-right-in">
        <div className="commentTop">
          <h2>Responses({props.comments && props.comments.length})</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            onClick={props.close}
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
          </svg>
        </div>
        <div className="Mycomment">
          <div className="mycommentTop">
            <img
              width={"37px"}
              height={"37px"}
              src={props.img}
              alt="profile image"
            ></img>
            <p className="commentInput">{props.name}</p>
          </div>
          <span ref={commentValue} contentEditable="true"></span>
          <div className="commentBtns">
            <p className="error">{error}</p>
            <button onClick={handleComment} className="f-btn btn-3">
              Respond
            </button>
          </div>
        </div>
        <div className="allcomments">
          {comments &&
            comments.map((it) => {
              return (
                <div className="com">
                  <div className="comtop">
                    <div className="comleft">
                      <img
                        width={"37px"}
                        height={"37px"}
                        src={it.commenterImg}
                        alt="profileImg"
                      />
                    </div>
                    <div className="comright">
                      <p>{it.username}</p>
                      <span>{it.date}</span>
                    </div>
                  </div>
                  <h4>{it.commentcontent}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
});

export default CommentDialog;
