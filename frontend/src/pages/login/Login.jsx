import React, { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../usecase";
import { AuthContext } from "../../state/authContext";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const {dispatch} = useContext(AuthContext);

  const handleSubmit = (e) => {
    // ボタン押下で画面リロードされるのを防ぐ
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <p className="loginMsg">ログインはこちら</p>
            <input
              ref={email}
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
            />
            <input
              ref={password}
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength="6"
            />
            <button className="loginButton" type="submit">
              ログイン
            </button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="loginRegisterButton">アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
};
