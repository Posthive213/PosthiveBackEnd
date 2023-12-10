import React from "react";
import userImg from "../../Images/user.png";
import NameDate from "../NameDate";
import { Link } from "react-router-dom";
export default function BlogInter(props) {
  const {
    name,
    title,
    date,
    authtoken,
    genre,
    thumbnail,
    profileImg,
    subtitle,
    id,
    userId,
  } = props;
  return (
    <Link
      onClick={() => {
        window.scrollTo(0, 0);
        !authtoken && document.querySelector("div.userImg").click();
      }}
      className="blogInterLink"
      to={authtoken ? `/blog/${id}` : "/"}
    >
      <div className="blogInter">
        <NameDate
          name={name}
          date={date}
          img={profileImg}
          userId={userId}
          authtoken={authtoken}
        />
        <div className="blogInterMain">
          <div className="leftBlogDetails">
            <h2>{title}</h2>
            <p>{subtitle.slice(0, 170)}...</p>
            <div className="blogDetails">
              <div className="genresDiv">
                {genre &&
                  genre.slice(0, 3).map((it) => {
                    return <span>{it}</span>;
                  })}
              </div>
              <div className="btns">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="gp"
                >
                  <path
                    d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"
                    fill="#6b6b6b"
                  ></path>
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mx my"
                >
                  <path
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.25 12h7.5"
                    stroke="#6b6b6b"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="blogImg">
            <img
              width={"350px"}
              height={"120px"}
              src={thumbnail}
              alt="Blog Thumbnail"
            ></img>
          </div>
        </div>
      </div>
    </Link>
  );
}
