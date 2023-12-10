import React, { useContext } from "react";
import NameDate from "../NameDate";
import { Link } from "react-router-dom";
import Context from "../Mainstate/Context";
export default function RecomInter(props) {
  const context = useContext(Context);
  const { authtoken } = context;
  const { name, date, title, profileImg, blogId, userId } = props;
  return (
    <Link
      className="blogLink"
      onClick={() => {
        !authtoken && document.querySelector("div.userImg").click();
      }}
      to={authtoken && `/blog/${blogId}`}
    >
      <div className="RecomInter">
        <NameDate
          name={name}
          img={profileImg}
          date={date}
          userId={userId}
          authtoken={authtoken}
        />
        <h2>{title}</h2>
      </div>
    </Link>
  );
}
