import React from "react";
import BlogInter from "../LeftSection/BlogInter";
export default function LeftProfile(props) {
  const HandleClick = (e) => {
    if (!e.target.classList.contains("btmstyle")) {
      const el = document.querySelectorAll(".btmstyle");
      el.forEach((it) => it.classList.remove("btmstyle"));
      e.target.classList.add("btmstyle");
    }
  };
  return (
    <div className="leftProfile">
      <h1>{props.name}</h1>
      <div className="leftProfileBottom">
        <div class="STop">
          <p onClick={HandleClick} className="btmstyle">
            Home
          </p>
          <p onClick={HandleClick}> About</p>
        </div>
      </div>
      <div className="BlogsInter">
        <h3>Posts</h3>
        {props.userPosts &&
          props.userPosts.map((it) => {
            const date = it.date.slice(0, 10);
            return (
              <>
                <BlogInter
                  name={it.name}
                  id={it._id}
                  userId={it.id}
                  date={date}
                  title={it.title}
                  subtitle={it.subtitle}
                  content={it.content}
                  genre={it.genre}
                  thumbnail={it.Thumbnail}
                  profileImg={it.profileImg}
                />
                <hr className="blogHr" />
              </>
            );
          })}
      </div>
    </div>
  );
}
