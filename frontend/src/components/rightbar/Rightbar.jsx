import React, { useEffect, useState } from "react";
import "./Rightbar.css";
import { Users } from "../../dummyData";
import { Online } from "../online/Online";
import { getUser } from "../../api/user";

export const Rightbar = ({ user }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUserInfo = async () => {
      if (user && user.followings && user.followings?.length > 0) {
        const userInfo = await Promise.all(
          user.followings.map((id) => getUser(id))
        );
        setUsers(userInfo);
      }
    };
    getUserInfo();
  }, [user]);

  const HomeRightBar = () => (
    <>
      <div className="eventContainer">
        <img src="/assets/star.png" alt="" className="starImg" />
        <span className="eventText">
          <b>フォロワー限定</b>イベント開催中！
        </span>
      </div>
      <img src="/assets/event.jpeg" alt="" className="eventImg" />
      <h4 className="rightbarTitle">オンラインの友達</h4>
      <ul className="rightbarFriendList">
        {Users.map((user) => (
          <Online user={user} key={user.id} />
        ))}
      </ul>
      <div className="promotionTitle">プロモーション広告</div>
      <img
        src="/assets/promotion/promotion1.jpeg"
        alt=""
        className="rightbarPromotionImg"
      />
      <p className="promotionName">ショッピング</p>
      <img
        src="/assets/promotion/promotion2.jpeg"
        alt=""
        className="rightbarPromotionImg"
      />
      <p className="promotionName">カーショップ</p>
      <img
        src="/assets/promotion/promotion3.jpeg"
        alt=""
        className="rightbarPromotionImg"
      />
      <p className="promotionName">ShinCode株式会社</p>
    </>
  );

  const ProfileRightbar = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        <h4 className="rightbarTitle">ユーザー情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身：</span>
            <span className="rightbarInfoKey">福岡</span>
          </div>
          <h4 className="rightbarTitle">あなたの友達</h4>
          <div className="rightbarFollowings">
            {users.map((user) => (
              <div className="rightbarFollowing" key={user._id}>
                <img
                  src={`${PUBLIC_FOLDER}${user.profilePicture}`}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  );
};
