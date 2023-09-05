import React, { useContext, useRef } from "react";
import "./Share.css";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import { AuthContext } from "../../state/authContext";
import { createPost } from "../../api/posts";

export const Share = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const message = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({
      userId: user._id,
      desc: message.current.value,
    });
    // リロードすれば最新のタイムラインが取得できる
    window.location.reload();
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={`${PUBLIC_FOLDER}${
              user.profilePicture || "/person/noAvatar.png"
            }`}
            alt=""
            className="shareProfileImg"
          />
          {/* Inputより複数行入力できる方がいいと思う */}
          <textarea
            ref={message}
            className="shareInput"
            placeholder="今何してるの？"
            multiple
          />
        </div>
        <hr className="shareHr" />
        <form className="shareButtons" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <div className="shareOption">
              {/* Material IconはCSSで色を変えてもいいがhtmlColorで指定することも可能 */}
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
            </div>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};
