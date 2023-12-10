import "./Styles/App.css";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import Mainstate from "./Components/Mainstate/Mainstate.js";
import WritePage from "./Components/Writepage/WritePage.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useState } from "react";
import Blog from "./Components/Blog/Blog.jsx";
import Profilepage from "./Components/Profilepage/Profilepage.jsx";

function App() {
  const [genreSelect, setgenreSelect] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Mainstate
          elements={
            <>
              <Navbar
                genreSelect={genreSelect}
                setgenreSelect={setgenreSelect}
              />
              <Routes>
                <Route path="/" element={<Home />}></Route>
              </Routes>
              <Routes>
                <Route
                  path="new-story"
                  element={
                    <WritePage
                      genreSelect={genreSelect}
                      setgenreSelect={setgenreSelect}
                    />
                  }
                ></Route>
                <Route path={`/blog/:blogId`} element={<Blog />}></Route>
                <Route
                  path={"/profile/:profileId"}
                  element={<Profilepage />}
                ></Route>
              </Routes>
            </>
          }
        ></Mainstate>
      </BrowserRouter>
    </div>
  );
}

export default App;
