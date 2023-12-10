import React, { useContext, useEffect, useRef, useState } from "react";
import TextEdit from "./TextEdit";
import ContentAdderbtn from "./ContentAdderbtn";
import GenreSelect from "./GenreSelect";
import { imageDb } from "../Firebase/ConfigFirebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Context from "../Mainstate/Context";
import { useNavigate } from "react-router-dom";
export default function WritePage(props) {
  const context = useContext(Context);
  const { addpost, authtoken } = context;
  const navigate = useNavigate();
  const { genreSelect, setgenreSelect } = props;
  const [images, setimages] = useState([]);
  const title = useRef("");
  const story = useRef("");
  const main = useRef("");
  const mainContent = useRef("");

  const handelClick = (e) => {
    if (e.target.innerText === "") {
      e.target.parentElement.lastChild.classList.add("display-none");
    }
  };
  const handelLeave = (e) => {
    if (e.target.innerText === "") {
      e.target.parentElement.lastChild.classList.remove("display-none");
    }
  };
  const paraAdder = (ele) => {
    const para = document.createElement("p");
    para.contentEditable = true;
    para.classList.add("story");
    para.addEventListener("keydown", handlekeydown);
    const storyDivArr = Array.from(story.current.childNodes);
    const index = storyDivArr.indexOf(ele);
    story.current.insertBefore(para, story.current.childNodes[index + 1]);
    story.current.childNodes[index + 1].focus();
  };
  const handlekeydownTitle = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      paraAdder(e.target);
    } else if (e.key === "Backspace") {
      if (!e.target.classList.contains("no-delete")) {
        if (e.target.innerText === "") {
          e.target.remove();
          story.current.lastChild.focus();
        }
      }
    }
  };
  const addImage = (e) => {
    if (e.target.files.length !== 0) {
      const imagesArr = [...images, e.target.files[0]];
      setimages(imagesArr);
      const url = URL.createObjectURL(e.target.files[0]);
      const newImg = document.createElement("img");
      newImg.src = url;
      newImg.setAttribute("width", "512");
      newImg.classList.add("AddedImg");
      newImg.classList.add("fr");
      const img = story.current.insertBefore(newImg, story.current.lastChild);
      paraAdder(img);
      e.target.value = "";
    }
  };
  const addVideo = (url) => {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match) {
      const iframe = document.createElement("iframe");
      iframe.height = "300";
      iframe.width = "500";
      iframe.src = `https://www.youtube.com/embed/${match[2]}`;
      const video = story.current.insertBefore(iframe, story.current.lastChild);
      paraAdder(video);
    }
  };
  const addunsplashimage = (url) => {
    const newImg = document.createElement("img");
    newImg.src = url;
    newImg.setAttribute("width", "512");
    newImg.classList.add("AddedImg", "unsplashImg");
    const img = story.current.insertBefore(newImg, story.current.lastChild);
    paraAdder(img);
  };
  const embedCodeAdder = (code) => {
    const parser = new DOMParser();
    const iframe = parser.parseFromString(code, "text/html").body.childNodes[0];
    iframe.height = "300";
    iframe.width = "500";
    const ele = story.current.insertBefore(iframe, story.current.lastChild);
    paraAdder(ele);
  };
  const Publish = async (title, subtitle, thumbnail, genres) => {
    const files = [...images, thumbnail];
    let url = [];
    for (let i = 0; i < files.length; i++) {
      const imageRef = ref(imageDb, `files/${files[i].name}-${v4()}`);
      const task = await uploadBytes(imageRef, files[i]).then(async () => {
        await getDownloadURL(imageRef).then(async (img) => {
          url = url.concat(img);
          if (i === files.length - 1) {
            await document.querySelectorAll(".fr").forEach((it, i) => {
              it.src = url[i];
            });
          }
        });
      });
    }
    addpost(
      mainContent.current.outerHTML,
      title,
      subtitle,
      url[url.length - 1],
      genres
    );
    setgenreSelect(false);
    navigate("/");
  };

  return (
    <>
      {genreSelect && (
        <GenreSelect setgenreSelect={setgenreSelect} Publish={Publish} />
      )}
      <div ref={main} className="writeDiv">
        <TextEdit />
        <ContentAdderbtn
          addImage={addImage}
          paraAdder={paraAdder}
          addVideo={addVideo}
          addunsplashimage={addunsplashimage}
          embedCodeAdder={embedCodeAdder}
        />
        <div
          style={{ width: "100%" }}
          ref={mainContent}
          className="mainContent"
        >
          <div className="titleDiv">
            <p
              onFocus={handelClick}
              onKeyDown={handlekeydownTitle}
              onBlur={handelLeave}
              ref={title}
              contentEditable="true"
              className="title "
            ></p>
            <span className="remove">Title</span>
          </div>
          <div ref={story} className="storyDiv">
            <p
              onBlur={handelLeave}
              onKeyDown={handlekeydown}
              onFocus={handelClick}
              contentEditable="true"
              className="story  no-delete"
            ></p>
            <span className="dis remove">Tell your Story...</span>
          </div>
        </div>
      </div>
    </>
  );
}
