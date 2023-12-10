import React, { useContext } from "react";
import RecomInter from "./RecomInter";
import Context from "../Mainstate/Context";

export default function Recomendations() {
  const context = useContext(Context);
  const { staffpicks } = context;

  return (
    <div className="Recomendations">
      <h4 className="checker">Staff picks</h4>
      {staffpicks &&
        staffpicks.map((it) => {
          const date = it.date.slice(0, 10);
          return (
            <RecomInter
              name={it.name}
              date={date}
              title={it.title}
              profileImg={it.profileImg}
              blogId={it._id}
              userId={it.id}
            ></RecomInter>
          );
        })}
    </div>
  );
}
