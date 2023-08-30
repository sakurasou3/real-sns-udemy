import React, { useEffect, useState } from "react";
import "./Timeline.css";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import { getAllTimeLine, getProfilePosts } from "../../api/timeline";

export const Timeline = ({ profile, userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response =
        profile ? await getProfilePosts(userId)
          : await getAllTimeLine("64df50c6cefda32195638a05");
      setPosts(response);
    };
    fetchPosts();
  }, [profile, userId]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};
