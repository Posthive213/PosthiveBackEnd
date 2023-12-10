import React, { useRef, useState } from "react";

export default function ContentAdderbtn(props) {
  const [currentAdd, setcurrentAdd] = useState("");
  const file = useRef("");
  const Btndiv = useRef("");
  const urlRef = useRef("");
  const urlDivRef = useRef("");
  const handleClick = (e) => {
    if (Btndiv.current.classList.contains("display-none")) {
      e.target.style.rotate = "45deg";
      Btndiv.current.classList.remove("display-none");
      setTimeout(() => {
        Btndiv.current.childNodes.forEach((el) => {
          el.classList.add("transform-0");
        });
      }, [100]);
    } else {
      e.target.style.rotate = "0deg";
      Btndiv.current.childNodes.forEach((el) => {
        el.classList.remove("transform-0");
      });
      setTimeout(() => {
        Btndiv.current.classList.add("display-none");
      }, [100]);
    }
  };
  const fileAdding = () => {
    file.current.click();
  };
  const handleUrlAdder = () => {
    if (urlDivRef.current.classList.contains("display-none")) {
      urlDivRef.current.classList.remove("display-none");
      setTimeout(() => {
        urlDivRef.current.classList.add("transform-0");
      }, [100]);
    } else {
      urlDivRef.current.classList.remove("transform-0");
      setTimeout(() => {
        urlDivRef.current.classList.add("display-none");
      }, [1000]);
    }
    urlRef.current.value = "";
  };
  const urlAdded = () => {
    if (currentAdd === "video") {
      props.addVideo(urlRef.current.value);
      handleUrlAdder();
    } else if (currentAdd === "unplashimage") {
      props.addunsplashimage(urlRef.current.value);
      handleUrlAdder();
    } else if (currentAdd === "embedcode") {
      props.embedCodeAdder(urlRef.current.value);
      handleUrlAdder();
    }
  };
  return (
    <>
      <div className="adder-btnDiv">
        <div ref={urlDivRef} className="urlInput display-none">
          <input
            ref={urlRef}
            type="text"
            placeholder="Paste or type a link"
          ></input>
          <svg
            onClick={handleUrlAdder}
            width="25"
            height="25"
            viewBox="0 0 32 32"
            version="1.1"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              sketchtype="MSPage"
            >
              <g
                id="Icon-Set"
                sketchtype="MSLayerGroup"
                transform="translate(-568.000000, -1087.000000)"
                fill="#000000"
              >
                <path
                  d="M584,1117 C576.268,1117 570,1110.73 570,1103 C570,1095.27 576.268,1089 584,1089 C591.732,1089 598,1095.27 598,1103 C598,1110.73 591.732,1117 584,1117 L584,1117 Z M584,1087 C575.163,1087 568,1094.16 568,1103 C568,1111.84 575.163,1119 584,1119 C592.837,1119 600,1111.84 600,1103 C600,1094.16 592.837,1087 584,1087 L584,1087 Z M589.717,1097.28 C589.323,1096.89 588.686,1096.89 588.292,1097.28 L583.994,1101.58 L579.758,1097.34 C579.367,1096.95 578.733,1096.95 578.344,1097.34 C577.953,1097.73 577.953,1098.37 578.344,1098.76 L582.58,1102.99 L578.314,1107.26 C577.921,1107.65 577.921,1108.29 578.314,1108.69 C578.708,1109.08 579.346,1109.08 579.74,1108.69 L584.006,1104.42 L588.242,1108.66 C588.633,1109.05 589.267,1109.05 589.657,1108.66 C590.048,1108.27 590.048,1107.63 589.657,1107.24 L585.42,1103.01 L589.717,1098.71 C590.11,1098.31 590.11,1097.68 589.717,1097.28 L589.717,1097.28 Z"
                  id="cross-circle"
                  sketchtype="MSShapeGroup"
                ></path>
              </g>
            </g>
          </svg>
          <svg
            onClick={urlAdded}
            width="25"
            height="25"
            viewBox="0 0 27 32"
            version="1.1"
          >
            <g id="icomoonIgnore"></g>
            <path
              d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z"
              fill="#000000"
            ></path>
            <path
              d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z"
              fill="#000000"
            ></path>
          </svg>
        </div>

        <div className="adder-btn">
          <div className="opner" onClick={handleClick}>
            <svg className="svgIcon-use" width="25" height="20">
              <path
                d="M20 12h-7V5h-1v7H5v1h7v7h1v-7h7"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div ref={Btndiv} className="mainfuncsDiv display-none">
            <div
              style={{ transform: "translateX(-9rem)" }}
              onClick={fileAdding}
              className="imageAdd"
            >
              <input
                onInput={props.addImage}
                ref={file}
                className="fileAdder"
                type="file"
              ></input>
              <svg className="svgIcon-use" width="32" height="32" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 17a2 2 0 100-4 2 2 0 000 4zm0-1a1 1 0 100-2 1 1 0 000 2z"
                  fill="#1A8917"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 10h12a2 2 0 012 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8a2 2 0 012-2zm0 1a1 1 0 00-1 1v4.293l2.646-2.647a.5.5 0 01.708 0L19.707 21H22a1 1 0 001-1v-8a1 1 0 00-1-1H10zm8.293 10L12 14.707l-3 3V20a1 1 0 001 1h8.293z"
                  fill="#1A8917"
                ></path>
                <rect
                  x=".5"
                  y=".5"
                  width="31"
                  height="31"
                  rx="15.5"
                  stroke="#1A8917"
                ></rect>
              </svg>
            </div>
            <div
              style={{ transform: "translateX(-18rem)" }}
              className="videoAdd"
              onClick={() => {
                setcurrentAdd("video");
                handleUrlAdder();
              }}
            >
              <svg className="svgIcon-use" width="32" height="32" fill="none">
                <rect
                  x="8.5"
                  y="10.761"
                  width="15"
                  height="11.522"
                  rx="1.5"
                  stroke="#1A8917"
                ></rect>
                <path
                  d="M19.5 16.522l-5.25 3.614v-7.229l5.25 3.615z"
                  stroke="#1A8917"
                  strokeLinejoin="round"
                ></path>
                <rect
                  x=".5"
                  y=".5"
                  width="31"
                  height="31"
                  rx="15.5"
                  stroke="#1A8917"
                ></rect>
              </svg>
            </div>
            <div
              style={{ transform: "translateX(-25rem)" }}
              className="unplashimage"
              onClick={() => {
                setcurrentAdd("unplashimage");
                handleUrlAdder();
              }}
            >
              <svg className="svgIcon-use" width="32" height="32" fill="none">
                <path
                  d="M18.224 15.313H22V22H10v-6.687h3.776v3.337h4.434v-3.336h.014zm0-5.313h-4.448v3.35h4.434V10h.014z"
                  fill="#1A8917"
                ></path>
                <rect
                  x=".5"
                  y=".5"
                  width="31"
                  height="31"
                  rx="15.5"
                  stroke="#1A8917"
                ></rect>
              </svg>
            </div>
            <div
              style={{ transform: "translateX(-39rem)" }}
              onClick={() => {
                setcurrentAdd("embedcode");
                handleUrlAdder();
              }}
              className="embedcode"
            >
              <svg className="svgIcon-use" width="32" height="32" fill="none">
                <path
                  d="M12.354 10.354a.5.5 0 00-.708-.708l.708.708zM6 16l-.354-.354a.5.5 0 000 .708L6 16zm5.646 6.354a.5.5 0 00.708-.708l-.708.708zm0-12.708l-6 6 .708.708 6-6-.708-.708zm-6 6.708l6 6 .708-.708-6-6-.708.708z"
                  fill="#1A8917"
                ></path>
                <path
                  d="M19.646 21.646a.5.5 0 00.708.708l-.708-.708zM26 16l.354.354a.5.5 0 000-.708L26 16zm-5.646-6.354a.5.5 0 00-.708.708l.708-.708zm0 12.708l6-6-.708-.708-6 6 .708.708zm6-6.708l-6-6-.708.708 6 6 .708-.708z"
                  fill="#1A8917"
                ></path>
                <rect
                  x=".5"
                  y=".5"
                  width="31"
                  height="31"
                  rx="15.5"
                  stroke="#1A8917"
                ></rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
