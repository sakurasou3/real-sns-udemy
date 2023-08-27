import React, { useCallback, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";

export const Post = ({ post }) => {
  const user = Users.find((u) => u.id === post.userId);
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = useCallback(() => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }, [isLiked, like]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture} alt="" className="postProfileImg" />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="/assets/heart.png"
              alt=""
              className="likeIcon"
              onClick={handleLikeClick}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}: コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
};
