import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import UserDetailsBlog from "./userDetailsBlog";
import Context from "../Mainstate/Context";
import CommentDialog from "./CommentDialog";
import Loading from "../Loading";
export default function Blog() {
  const dialog = useRef("");
  const { blogId } = useParams();
  const context = useContext(Context);
  const { blog, authtoken, Cblog, Userdetails, addComment } = context;

  useEffect(() => {
    if (authtoken) {
      blog(blogId);
    }
  }, []);

  useEffect(() => {
    if (Cblog !== null) {
      const parser = new DOMParser();
      const cont = parser.parseFromString(Cblog.content, "text/html").body;
      const codeTaker = document.querySelector(".blogCode");
      if (codeTaker && !codeTaker.classList.contains("added")) {
        codeTaker.appendChild(cont);
        codeTaker.classList.add("added");
        document
          .querySelectorAll(`.blog p[contenteditable="true"]`)
          .forEach((it) => {
            it.setAttribute("contenteditable", "false");
          });
        document.querySelectorAll(".remove").forEach((it) => it.remove());
      }
    }
  }, [Cblog]);

  const handleComments = () => {
    if (dialog.current.classList.contains("display-none")) {
      dialog.current.classList.remove("display-none");
      document.body.classList.add("no-scroll");
      setTimeout(() => {
        dialog.current.childNodes[0].classList.add("transform-right-out");
      }, [100]);
      window.scrollTo(0, 0);
    } else {
      dialog.current.childNodes[0].classList.remove("transform-right-out");
      setTimeout(() => {
        document.body.classList.remove("no-scroll");
        dialog.current.classList.add("display-none");
      }, [600]);
    }
  };

  return (
    <>
      <section className="blogMain">
        {Cblog && Userdetails ? (
          <>
            <CommentDialog
              ref={dialog}
              comments={Cblog.comments.reverse()}
              img={Userdetails.profileImg}
              name={Userdetails.name}
              close={handleComments}
              addComment={addComment}
              blogId={blogId}
            />

            <div className="blog">
              <div className="topSec">
                <h1>{Cblog.title}</h1>
                <p>{Cblog.subtitle}</p>
                <UserDetailsBlog
                  name={Cblog.name}
                  img={Cblog.profileImg}
                  date={Cblog.date}
                  userId={Cblog.id}
                  state={Cblog.id === Userdetails._id}
                />
              </div>
              <div className="l_c">
                <div onClick={handleComments} className="comment">
                  <svg width="24" height="24" viewBox="0 0 24 24" class="gv">
                    <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path>
                  </svg>
                  <p>{Cblog.comments.length}</p>
                </div>
              </div>
              <div className="blogCodeMain">
                <div className="blogCode"></div>
              </div>
            </div>
          </>
        ) : (
          <Loading length={"7rem"}></Loading>
        )}
      </section>
    </>
  );
}
