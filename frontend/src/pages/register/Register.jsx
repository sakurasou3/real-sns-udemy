import React, { useContext, useEffect, useRef } from "react";
import "./Register.css";
import { registerCall } from "../../usecase";
import { AuthContext } from "../../state/authContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const navigate = useNavigate();

  const { validationError, isRegister, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    // ボタン押下で画面リロードされるのを防ぐ
    e.preventDefault();

    registerCall(
      {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        passwordConfirm: passwordConfirm.current.value,
      },
      dispatch
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  useEffect(() => {
    if (validationError) {
      // HTML inputタグにカスタムメッセージを表示させる。
      // https://developer.mozilla.org/ja/docs/Web/API/HTMLInputElement/setCustomValidity
      passwordConfirm.current.setCustomValidity("パスワードが違います。");
      passwordConfirm.current.reportValidity();
    } else if (isRegister) {
      // 登録成功したらログイン画面に遷移させる
      navigate("/login");
    }
  }, [navigate, isRegister, validationError]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <p className="loginMsg">新規登録はこちら</p>
            <input
              ref={username}
              type="text"
              className="loginInput"
              placeholder="ユーザー名"
              required
            />
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
            <input
              ref={passwordConfirm}
              type="password"
              className="loginInput"
              placeholder="確認用パスワード"
              required
              minLength="6"
            />
            <button className="loginButton" type="submit">
              サインアップ
            </button>
            <button className="loginRegisterButton" onClick={handleLogin}>
              ログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
