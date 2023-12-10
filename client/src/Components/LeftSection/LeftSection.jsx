import React, { useContext, useEffect, useRef, useState } from "react";
import SuggestedTopics from "./SuggestedTopics";
import BlogInter from "./BlogInter";
import Context from "../Mainstate/Context";
import Loading from "../Loading";
export default function LeftSection(props) {
  const context = useContext(Context);
  const { posts, Userdetails, intrestpostsFunc, intrestPost, authtoken } =
    context;
  const [loading, setloading] = useState(false);
  const [loadMorecon, setloadMorecon] = useState(false);
  const [index, setindex] = useState(4);
  const { intrest, setintrest } = props;
  const loadMore = useRef("");

  const changeIntrest = (intrest) => {
    setloading(true);
    intrestpostsFunc(intrest);
    setintrest(true);
    setTimeout(() => {
      setloading(false);
    }, [1000]);
  };
  const normalPosts = () => {
    setloading(true);
    setintrest(false);
    setTimeout(() => {
      setloading(false);
    }, [500]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((its) => {
      its.forEach((it) => {
        if (it.isIntersecting) {
          setloadMorecon(true);
        }
      });
    });
    observer.observe(loadMore.current);
  }, []);
  useEffect(() => {
    if (loadMore) {
      setTimeout(() => {
        let i = index + 3;
        setindex(i);
        console.log(i);
        setloadMorecon(false);
      }, [1000]);
    }
  }, [loadMorecon]);

  const blogs = (it) => {
    const date = it.date.slice(0, 10);
    return (
      <>
        <BlogInter
          name={it.name}
          id={it._id}
          userId={it.id}
          date={date}
          title={it.title}
          subtitle={it.subtitle}
          content={it.content}
          genre={it.genre}
          thumbnail={it.Thumbnail}
          profileImg={it.profileImg}
          authtoken={authtoken}
        />
        <hr className="blogHr"></hr>
      </>
    );
  };

  return (
    <section className="leftSec">
      {Userdetails && (
        <SuggestedTopics
          Userdetails={Userdetails}
          changeIntrest={changeIntrest}
          normalPosts={normalPosts}
        />
      )}
      {loading && <Loading />}
      <div className="BlogsInter">
        {!intrest ? (
          posts && posts.slice(0, index).map((it) => blogs(it))
        ) : intrestPost && intrestPost.length !== 0 ? (
          intrestPost.map((it) => blogs(it))
        ) : (
          <h1 style={{ fontFamily: `"Source Serif 4", serif` }}>
            No Blogs regarding this topic.
          </h1>
        )}
        <div ref={loadMore} className="loadMore"></div>
      </div>
    </section>
  );
}
