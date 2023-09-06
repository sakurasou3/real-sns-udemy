import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import { AuthContext } from "../../state/authContext";
import { createPost } from "../../api/posts";
import { upload } from "../../api/upload";

export const Share = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const message = useRef();
  const [file, setFile] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let img = "";
    if (file) {
      img = await upload(file);
      console.log("🚀 ~ file: Share.jsx:20 ~ handleSubmit ~ img:", img);
    }

    const postData = {
      userId: user._id,
      desc: message.current.value,
      ...(file && { img: `/${img}` }),
    };
    console.error(postData);
    await createPost(postData);

    // リロードすれば最新のタイムラインが取得できる
    window.location.reload();
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
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
            {/* htmlForの値とinputのidの値を一致させることで、label選択時にinputを発動させられる */}
            <label className="shareOption" htmlFor="file">
              {/* Material IconはCSSで色を変えてもいいがhtmlColorで指定することも可能 */}
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              <input
                type="file"
                id="file"
                accept=".jpeg, .jpg, .png"
                style={{ display: "none" }}
                onChange={handleOnChange}
              />
            </label>
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
