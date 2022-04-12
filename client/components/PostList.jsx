import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import "./PostList.scss";

const PostList = () => {
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState({data: [], page: 1});
  const portion = 20;
  const totalPages = Math.ceil(100 / portion);
  const lastItem = createRef();
  const observerLoader = useRef();

  const getNewPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _limit: portion,
          _page: posts.page,
        },
      })
      .then(({ data }) => {
        setPosts({ data: [...posts.data, ...data], page: posts.page + 1});
      });
  };

  useEffect(() => {
    getNewPosts();
  }, []);

  useEffect(
    () => {
      if (observerLoader.current) observerLoader.current.disconnect();
      const actionInSight = (entries) => {
        if (entries[0].isIntersecting && posts.page <= totalPages) {
          getNewPosts();
        }
      };
      observerLoader.current = new IntersectionObserver(actionInSight);
      if (lastItem.current) observerLoader.current.observe(lastItem.current);
    },
    [lastItem]
  );



  return (
    <div className="post-list">
      {posts.data.map((item, index) => {
        if (index + 1 === posts.data.length) {
          return <PostItem key={item.id} info={item} ref={lastItem} />;
        }
        return <PostItem key={item.id} info={item} />;
      })}
    </div>
  );
};

export default PostList;
