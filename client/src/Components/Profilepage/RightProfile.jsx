import React from "react";
import { useNavigate } from "react-router";

export default function RightProfile(props) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authtoken");
    props.setauthtoken(null);
    props.setposts(null);
    props.setstaffpicks(null);
    props.setUserdetails(null);
    navigate("/");
  };
  return (
    <div className="rightProfile">
      <img
        width={"90px"}
        height={"90px"}
        src={props.img}
        alt="profileimg"
      ></img>
      <div>
        <h2>{props.name}</h2>
        <p>{props.followers.length} Follwers</p>
      </div>
      {!props.state ? (
        <div className="Pbtns">
          <button className="f-btn btn-3">Follow</button>
        </div>
      ) : (
        <div className="Pbtns">
          <button onClick={logout} className="f-btn btn-3  btn-2">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
