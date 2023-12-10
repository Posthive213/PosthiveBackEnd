import React, { useEffect, useState } from "react";
import Context from "./Context";
export default function Mainstate(props) {
  const [error, seterror] = useState(null);
  const [Otp, setOtp] = useState(null);
  const [Userdetails, setUserdetails] = useState(null);
  const [posts, setposts] = useState(null);
  const [intrestPost, setintrestPost] = useState(null);
  const [staffpicks, setstaffpicks] = useState(null);
  const [Cblog, setCblog] = useState(null);
  const [userpostsData, setuserpostsData] = useState(null);
  const [otherUserData, setotherUserData] = useState(null);
  const [authtoken, setauthtoken] = useState(
    localStorage.getItem("authtoken") || null
  );
  const url = "http://localhost:5000";

  const signup = async (email, name, password, verification, profileImg) => {
    const data = await fetch(`${url}/users/signup`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        password: password || "GoogleAccountActivated123654",
        verification: verification || false,
        profileImg:
          profileImg ||
          "https://hillcrestnc.com/wp-content/uploads/2019/03/profileimg-350x350.png",
      }),
    });
    const parsedData = await data.json();
    if (parsedData.errors !== undefined) {
      seterror(parsedData.errors);
    } else if (parsedData.otp !== undefined) {
      setOtp(parsedData.otp);
    } else {
      setauthtoken(parsedData.authtoken);
      localStorage.setItem("authtoken", parsedData.authtoken);
    }
  };

  const signin = async (email, password) => {
    const data = await fetch(`${url}/users/signin`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const parsedData = await data.json();
    if (parsedData.errors !== undefined) {
      seterror(parsedData.errors);
    } else if (parsedData.otp !== undefined) {
      setOtp(parsedData.otp);
    } else {
      setauthtoken(parsedData.authtoken);
      localStorage.setItem("authtoken", parsedData.authtoken);
    }
  };

  const verifyOtp = async (email) => {
    const data = await fetch(`${url}/users/verified`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const parseddata = await data.json();
    setauthtoken(parseddata.authtoken);
    localStorage.setItem("authtoken", parseddata.authtoken);
  };
  const userData = async () => {
    const data = await fetch(`${url}/users/getUserData`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });
    const parsedData = await data.json();
    setUserdetails(parsedData.user);
    console.log(parsedData);
  };

  const addpost = async (content, title, subtitle, Thumbnail, genre) => {
    const data = await fetch(`${url}/posts/addpost`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({
        content,
        name: Userdetails.name,
        profileImg: Userdetails.profileImg,
        genre,
        title,
        subtitle,
        Thumbnail,
      }),
    });
    const parseddata = await data.json();
    console.log(parseddata);
  };

  const allposts = async () => {
    const data = await fetch(`${url}/posts/allPosts`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });
    const parsedData = await data.json();
    setposts(parsedData.Posts.reverse());
    console.log(parsedData);
  };
  const staffPicks = async () => {
    const data = await fetch(`${url}/posts/staffPicks`, {
      method: "Get",
      headers: { "Contesnt-Type": "application/json", authtoken: authtoken },
    });
    const parsedData = await data.json();
    setstaffpicks(parsedData.staffpicks.reverse());

    console.log(parsedData);
  };

  const blog = async (id) => {
    const data = await fetch(`${url}/posts/getBlog/${id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });
    const parsedBlog = await data.json();
    setCblog(parsedBlog);
    console.log(parsedBlog);
  };

  const addComment = async (id, content, date) => {
    const data = await fetch(`${url}/posts/commentpost/${id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({
        username: Userdetails.name,
        commenterImg: Userdetails.profileImg,
        date: date,
        commentcontent: content,
      }),
    });
  };
  const userPosts = async (id) => {
    const posts = await fetch(`${url}/posts/userPosts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });
    const parsedposts = await posts.json();
    setuserpostsData(parsedposts.posts);
  };
  const getotherUserData = async (id) => {
    const user = await fetch(`${url}/users/getotherUserData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    });
    const parseduser = await user.json();
    setotherUserData(parseduser.user);
  };
  const intrestpostsFunc = async (intrest) => {
    const posts = await fetch(`${url}/posts/intresPost`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        authtoken: authtoken,
        intrest: intrest,
      },
    });
    const parsedposts = await posts.json();
    setintrestPost(parsedposts);
  };

  useEffect(() => {
    if (authtoken) {
      userData();
    }
  }, []);
  useEffect(() => {
    setCblog(null);
    const maincode = document.querySelector(".blogCode");
    if (maincode) {
      maincode.innerHTML = "";
    }
  }, [window.location.pathname]);

  return (
    <Context.Provider
      value={{
        signup,
        error,
        Otp,
        authtoken,
        verifyOtp,
        signin,
        seterror,
        addpost,
        Userdetails,
        posts,
        staffpicks,
        blog,
        Cblog,
        addComment,
        userPosts,
        userpostsData,
        getotherUserData,
        otherUserData,
        allposts,
        staffPicks,
        intrestpostsFunc,
        intrestPost,
        setintrestPost,
        setauthtoken,
        userData,
        setUserdetails,
        setposts,
        setstaffpicks,
      }}
    >
      {props.elements}
    </Context.Provider>
  );
}
