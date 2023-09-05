import { Chat, Notifications, Search } from "@mui/icons-material";
import React, { useContext } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/authContext";

export const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Real SNS</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか？"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarItemIcons">
          <div className="topbarIconItem">
            <Chat className="" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications className="" />
            <span className="topbarIconBadge">2</span>
          </div>
          <Link to={`/profile/${user._id}`}>
            <img
              src={`${PUBLIC_FOLDER}${
                user && user.profilePicture
                  ? user.profilePicture
                  : "/person/noAvatar.png"
              }`}
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
