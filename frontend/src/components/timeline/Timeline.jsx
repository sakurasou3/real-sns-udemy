import React from "react";
import "./Timeline.css";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import { Posts } from "../../dummyData";

export const Timeline = () => {
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
