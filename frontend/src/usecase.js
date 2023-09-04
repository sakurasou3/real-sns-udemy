import { login, register } from "./api/auth";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await login(user);
    dispatch({ type: "LOGIN_SUCCESS", payload: response });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};

export const registerCall = async (user, dispatch) => {
  dispatch({ type: "REGISTER_START" });

  // パスワードと確認用パスワードの整合性チェック
  if (user.password !== user.passwordConfirm) {
    dispatch({ type: "REGISTER_VALIDATION_ERROR" });
    return;
  }

  try {
    await register(user);
    dispatch({ type: "REGISTER_SUCCESS" });
  } catch (err) {
    dispatch({ type: "REGISTER_ERROR", payload: err });
  }
};
