import React, { useContext, useEffect, useState } from "react";
import "./Timeline.css";
import { Share } from "../share/Share";
import { Post } from "../post/Post";
import { getAllTimeLine, getProfilePosts } from "../../api/posts";
import { AuthContext } from "../../state/authContext";

export const Timeline = ({ profile, userId }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = profile
        ? await getProfilePosts(userId) // プロフィールの場合
        : await getAllTimeLine(user._id); // ホームの場合
      setPosts(response);
    };
    fetchPosts();
  }, [profile, user._id, userId]);

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
