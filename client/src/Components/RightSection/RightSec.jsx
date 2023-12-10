import React, { useEffect, useState } from "react";
import Recomendations from "./Recomendations";
import Recomendedopics from "./Recomendedopics";
import RecomndedFollows from "./RecomndedFollows";
import ReadingList from "./ReadingList";

export default function RightSec(props) {
  let currentScroll = window.scrollY;
  const ScrollFunc = (e) => {
    if (window.location.pathname === "/") {
      const el = document.querySelector(".hero .rightSec");
      if (window.scrollY < currentScroll) {
        el.style.top = "0px";
        currentScroll = window.scrollY;
      } else {
        el.style.top = window.innerHeight - el.scrollHeight + "px";
        currentScroll = window.scrollY;
      }
    } else {
      document.removeEventListener("scroll", ScrollFunc);
    }
  };

  useEffect(() => {
    if (window.innerWidth >= "912" && window.location.pathname === "/") {
      document.addEventListener("scroll", ScrollFunc);
    }
  }, [window.location.pathname]);

  return (
    <div className="rightSec">
      <Recomendations />
      <Recomendedopics setintrest={props.setintrest} />
      <RecomndedFollows />
      <ReadingList />
    </div>
  );
}
