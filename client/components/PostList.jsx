import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import "./PostList.scss";

const PostList = () => {
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const portion = 20;
  const totalPages = Math.ceil(100 / portion);

  console.log("render PostList", posts.length);
  const lastItem = createRef();
  console.log(lastItem);

  const getNewPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _limit: portion,
          _page: 1,
        },
      })
      .then(({ data }) => {
        setPosts([...posts, ...data]);
      });
  };

  useEffect(() => {
    getNewPosts();
    // if (observerLoader.current) observerLoader.current.disconnect();

    // const cb = (entries) => {
    //   if (entries[0].isIntersecting && page < totalPages) {
    //     getNewPosts();
    //   }
    // };

    // observerLoader.current = new IntersectionObserver(cb);
    // observerLoader.current.observe(loader.current);
  }, []);

  return (
    <div className="post-list">
      {posts.map((item, index) => {
        if (index + 1 === posts.length) {
          return <PostItem key={item.id} info={item} ref={lastItem} />;
        }
        return <PostItem key={item.id} info={item} />;
      })}
    </div>
  );
};

export default PostList;
