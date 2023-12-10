import React, { useContext } from "react";
import Context from "../Mainstate/Context";

export default function Recomendedopics(props) {
  const context = useContext(Context);
  const { intrestpostsFunc } = context;
  const IntrestTopics = [
    "programming",
    "inovation",
    "creativity",
    "Css",
    "writing",
    "node",
    "express",
  ];
  return (
    <div className="rTopics">
      <h4>Recommended Topics</h4>
      <div className="topicsDiv">
        {IntrestTopics &&
          IntrestTopics.map((it) => {
            return (
              <span
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  intrestpostsFunc(e.target.innerText);
                  props.setintrest(true);
                  const el = document.querySelectorAll(".btmstyle");
                  el.forEach((it) => it.classList.remove("btmstyle"));
                }}
              >
                {it}
              </span>
            );
          })}
      </div>
    </div>
  );
}
