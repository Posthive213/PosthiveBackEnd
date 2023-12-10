import React, { useEffect } from "react";

export default function SuggestedTopics(props) {
  const Intrestes = ["For You", ...props.Userdetails.intrestes];
  const HandleClick = (e) => {
    if (!e.target.classList.contains("btmstyle")) {
      const el = document.querySelectorAll(".btmstyle");
      el.forEach((it) => it.classList.remove("btmstyle"));
      e.target.classList.add("btmstyle");
      if (e.target.innerText !== "For You") {
        props.changeIntrest(e.target.innerText);
      } else {
        props.normalPosts();
      }
    }
  };
  useEffect(() => {
    document.querySelectorAll(".topNavEle")[0].classList.add("btmstyle");
  }, []);
  return (
    <div className="STop">
      {Intrestes &&
        Intrestes.map((it) => {
          return (
            <p className="topNavEle" onClick={HandleClick}>
              {it}
            </p>
          );
        })}
    </div>
  );
}
