import React from "react";
import userImg from "../../Images/user.png";
import { Link } from "react-router-dom";
export default function userDeatilsBlog(props) {
  const { name, date, img, userId, state } = props;
  return (
    <div className="userDeatilsBlog">
      <Link to={`/profile/${userId}`}>
        <img
          width="23rem"
          height="23rem"
          src={img ? img : userImg}
          alt="Blogger "
        ></img>
      </Link>
      <div className="userDetailsRight">
        <div>
          <Link to={`/profile/${userId}`}>
            <p>{name}</p>
          </Link>
          {!state && (
            <>
              - <span>Follow</span>
            </>
          )}
        </div>
        <div>
          <span>{date.slice(0, 10)}</span>
        </div>
      </div>
    </div>
  );
}
