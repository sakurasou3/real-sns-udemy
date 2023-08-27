import React from "react";
import "./Share.css";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
export const Share = () => {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/person/1.jpeg" alt="" className="shareProfileImg" />
          {/* Inputより複数行入力できる方がいいと思う */}
          <textarea
            className="shareInput"
            placeholder="今何してるの？"
            multiple
          />
        </div>
        <hr className="shareHr" />
        <div className="shareButtons">
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
          <button className="shareButton">投稿</button>
        </div>
      </div>
    </div>
  );
};
