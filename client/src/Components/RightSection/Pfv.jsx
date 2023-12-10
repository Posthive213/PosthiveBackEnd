import React from "react";
import userImg from "../../Images/user.png";
export default function Pfv(props) {
  const { name, desc } = props;
  return (
    <div className="Pvf">
      <img
        width="25rem"
        height="25rem"
        className="userImg"
        src={userImg}
        alt="tofollow"
      ></img>
      <div className="PvfText">
        <h3>{name}</h3>
        <p>{desc.slice(0, 40)}...</p>
      </div>
      <button className="f-btn">Follow</button>
    </div>
  );
}
