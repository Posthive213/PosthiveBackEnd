import React, { useRef, useState } from "react";
import Loading from "../Loading";
export default function GenreSelect(props) {
  const Newgenre = useRef("");
  const thumbnail = useRef("");
  const title = useRef("");
  const subtitle = useRef("");
  const [thumbnailImg, setthumbnailImg] = useState("");
  const [error, seterror] = useState("");
  const [genres, setgenres] = useState([
    "programming",
    "coding",
    "mental health",
    "Networking",
  ]);
  const [loading, setloading] = useState(false);

  const addGenre = (e) => {
    if (Newgenre.current.value !== "" && e.key === "Enter") {
      const Allgenres = [...genres, Newgenre.current.value];
      setgenres(Allgenres);
      Newgenre.current.value = "";
      e.preventDefault();
    }
  };
  const removeTopic = (e) => {
    const index = e.target.parentElement.getAttribute("index");
    let newArr = [];
    genres.forEach((el, ind) => {
      console.log(ind == index);
      if (ind === +index) {
        return;
      } else {
        newArr = [...newArr, el];
      }
    });
    setgenres(newArr);
  };

  const handleClickImg = (e) => {
    e.target.childNodes[2] && e.target.childNodes[2].click();
  };
  const handleImg = (e) => {
    if (e.target.files.length !== 0) {
      setthumbnailImg(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      thumbnail.current.classList.remove("display-none");
      thumbnail.current.src = url;
      thumbnail.current.parentElement.childNodes[1].classList.add(
        "display-none"
      );
    }
  };
  const Publish = () => {
    if (title.current.value === "") {
      seterror("Enter a title to Publish your blog");
    } else if (subtitle.current.value === "") {
      seterror("Enter a title to subtitle Publish your blog");
    } else if (thumbnail.current.classList.contains("display-none")) {
      seterror("Please provide a Thumbnail for your blog");
    } else if (genres.length < 3) {
      seterror("Please provide a at least 3 topics for your blog");
    } else {
      seterror(null);
      props.Publish(
        title.current.value,
        subtitle.current.value,
        thumbnailImg,
        genres
      );
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, [5000]);
    }
  };

  return (
    <div className="genreSelectDiv">
      <div className="genreSelect">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="55"
          height="55"
          className="close-btn"
          onClick={() => {
            props.setgenreSelect(false);
          }}
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>

        <div className="Preview">
          <p>Preview</p>
          <div onClick={handleClickImg} className="fileInput">
            <img
              ref={thumbnail}
              src=""
              alt="thumbnail"
              className="thumb display-none"
            ></img>

            <p>
              Include a high-quality image in your story to make it more
              inviting to readers
            </p>

            <input
              onInput={handleImg}
              type="file"
              className="display-none"
            ></input>
          </div>
          <input ref={title} type="text" placeholder="Write a preview title" />
          <input
            ref={subtitle}
            type="text"
            placeholder="Write a preview Sub-title"
          />
        </div>
        <div className="genres">
          <h2>
            Publishing to: <b>Jawadedu</b>
          </h2>
          <p>
            Add or change topics (up to 3) so readers know what your story is
            about
          </p>
          <div className="geenreInput">
            {genres &&
              genres.map((ele, id) => {
                return (
                  <span key={id} index={id}>
                    {ele}
                    <button onClick={removeTopic} className="cross">
                      x
                    </button>
                  </span>
                );
              })}
            <input
              ref={Newgenre}
              onKeyDown={addGenre}
              type="text"
              placeholder="Add a Topic"
            ></input>
          </div>
          {error && <p className="error">{error}</p>}
          {loading && <Loading length={"4rem"} />}
          <button onClick={Publish} className="f-btn btn-3">
            Publish Now
          </button>
        </div>
      </div>
    </div>
  );
}
