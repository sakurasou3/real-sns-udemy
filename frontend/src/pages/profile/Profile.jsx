import React, { useEffect, useState } from "react";
import "./Profile.css";

import { Topbar } from "../../components/topbar/Topbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Timeline } from "../../components/timeline/Timeline";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { getUser } from "../../api/users";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const userId = useParams().userId;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(userId);
      setUser(response);
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={`${PUBLIC_FOLDER}${user.caverPicture || "/post/5.jpeg"}`}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={`${PUBLIC_FOLDER}${
                  user.profilePicture || "/person/noAvatar.png"
                }`}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline profile userId={user._id} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
