import React from "react";
import userImg from "../Images/user.png";
import { Link } from "react-router-dom";
export default function NameDate(props) {
  const { name, date, img, userId, authtoken } = props;
  return (
    <div className="userDeatils">
      <Link
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        className="nameDateLink"
        to={authtoken ? `/profile/${userId}` : "/"}
      >
        <img
          width="23rem"
          height="23rem"
          src={img ? img : userImg}
          alt="Blogger "
        ></img>
        <p>{name}</p>
      </Link>
      <span>{date}</span>
    </div>
  );
}
