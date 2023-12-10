import React, { useContext, useEffect, useState } from "react";
import logo from "../Images/logo.png";
import userImg from "../Images/user.png";
import UACDialog from "./UACDialog";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Context from "./Mainstate/Context";

export default function Navbar(props) {
  const context = useContext(Context);
  const { authtoken, Userdetails } = context;
  const { genreSelect, setgenreSelect } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [authShow, setauthShow] = useState(false);
  const [pub, setpub] = useState(false);

  const opnerCloser = () => {
    if (!authShow) {
      setTimeout(() => {
        document.querySelector(".Uac").classList.toggle("up-animate-out");
      }, [100]);
      setauthShow(!authShow);
      document.body.classList.toggle("no-scroll");
    } else {
      setTimeout(() => {
        setauthShow(!authShow);
      }, [300]);
      document.querySelector(".Uac").classList.toggle("up-animate-out");
      document.body.classList.toggle("no-scroll");
    }
  };

  const dialogHandler = () => {
    if (!authtoken) {
      opnerCloser();
    } else {
      Userdetails && navigate(`/profile/${Userdetails._id}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/new-story") {
      setpub(true);
    } else {
      setpub(false);
    }
  }, [location.pathname]);

  const handlePublish = () => {
    setgenreSelect(!genreSelect);
  };
  const handleWrite = () => {
    console.log(authtoken);
    if (authtoken) {
      navigate("/new-story");
    } else {
      dialogHandler();
    }
  };

  return (
    <>
      {authShow && <UACDialog func={dialogHandler} opnerCloser={opnerCloser} />}
      <section className="Navbar">
        <div className="mainNav">
          <div className="leftSec">
            <Link to={"/"}>
              <div className="logo">
                <img src={logo} alt="logo"></img>
              </div>
            </Link>
            <div className="search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#6b6b6b">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z"
                  fill="6b6b6b"
                ></path>
              </svg>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="rightSec">
            {!pub ? (
              <div onClick={handleWrite} className="WriteDiv">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-label="Write"
                >
                  <path
                    d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                    fill="#6b6b6b"
                  ></path>
                  <path
                    d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                    stroke="#6b6b6b"
                  ></path>
                </svg>
                <span>Write</span>
              </div>
            ) : (
              <button onClick={handlePublish} className="f-btn btn-3">
                Publish
              </button>
            )}

            {/* <div className="notifications">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 20"
                fill="none"
                aria-label="Notifications"
              >
                <path
                  d="M15 18.5a3 3 0 1 1-6 0"
                  stroke="#6b6b6b"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z"
                  stroke="#6b6b6b"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div> */}
            <div onClick={dialogHandler} className="userImg">
              <img
                src={Userdetails ? Userdetails.profileImg : userImg}
                alt="user"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
