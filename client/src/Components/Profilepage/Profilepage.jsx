import React, { useContext, useEffect } from "react";
import LeftProfile from "./LeftProfile";
import RightProfile from "./RightProfile";
import Context from "../Mainstate/Context";
import { useParams } from "react-router";

export default function Profilepage() {
  const context = useContext(Context);
  const {
    userPosts,
    userpostsData,
    getotherUserData,
    otherUserData,
    Userdetails,
    setposts,
    setstaffpicks,
    setUserdetails,
    setauthtoken,
  } = context;
  const { profileId } = useParams("");

  useEffect(() => {
    userPosts(profileId);
    getotherUserData(profileId);
  }, []);

  return (
    <>
      {otherUserData && userpostsData && (
        <section className="profilepageMain">
          <div className="profilepage">
            <LeftProfile userPosts={userpostsData} name={otherUserData.name} />
            <RightProfile
              name={otherUserData.name}
              img={otherUserData.profileImg}
              followers={otherUserData.followers}
              state={Userdetails._id === otherUserData._id}
              setauthtoken={setauthtoken}
              setposts={setposts}
              setstaffpicks={setstaffpicks}
              setUserdetails={setUserdetails}
            />
          </div>
        </section>
      )}
    </>
  );
}
