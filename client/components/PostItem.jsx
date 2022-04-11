import React, { forwardRef } from "react";

const PostItem = forwardRef((props, ref) => {
  // const param = props.last ? { ref: { reference } } : {};
  // console.log(props.info.id, param);

  const content = `${props.info.id} ${props.info.title}`;

  return <div className="post-list__item" ref={ref}>{content}</div>;

});

export default PostItem;
