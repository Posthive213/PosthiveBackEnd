import React from "react";
import Pfv from "./Pfv";

export default function RecomndedFollows() {
  const people = [
    {
      name: "Ali",
      desc: "I'm Ali an experienced Front end developer with 4+ years of experience in the texh field",
    },
    {
      name: "Ali",
      desc: "I'm Ali an experienced Front end developer with 4+ years of experience in the texh field",
    },
    {
      name: "Ali",
      desc: "I'm Ali an experienced Front end developer with 4+ years of experience in the texh field",
    },
  ];
  return (
    <div className="RF">
      <h4>Who to follow</h4>
      <div className="RfDiv">
        {people &&
          people.map((it) => {
            return <Pfv name={it.name} desc={it.desc} />;
          })}
      </div>
    </div>
  );
}
