import React, { useContext, useEffect, useState } from "react";
import LeftSection from "./LeftSection/LeftSection";
import RightSec from "./RightSection/RightSec";
import Context from "./Mainstate/Context";

export default function Home() {
  const context = useContext(Context);
  const { allposts, staffPicks, authtoken } = context;
  const [intrest, setintrest] = useState(false);
  useEffect(() => {
    allposts();
    staffPicks();
  }, []);

  return (
    <div>
      <div className="hero">
        <LeftSection intrest={intrest} setintrest={setintrest}></LeftSection>
        <RightSec intrest={intrest} setintrest={setintrest}></RightSec>
      </div>
    </div>
  );
}
