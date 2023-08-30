import React, { useCallback, useState, useEffect } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
import { getUser } from "../../api/user";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes?.length ?? 0);
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = useCallback(() => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }, [isLiked, like]);

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(post.userId);
      setUser(response);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user._id}`}>
              <img
                src={`${PUBLIC_FOLDER}${
                  user.profilePicture || "/person/noAvatar.png"
                }`}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            {/* timeago.jsを使ってxx分前などの表示にする */}
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={`${PUBLIC_FOLDER}${post.img}`} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PUBLIC_FOLDER}/heart.png`}
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
