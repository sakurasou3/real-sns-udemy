export const LoginStart = (user) => ({ type: "LOGIN_START" });
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginError = (error) => ({ type: "LOGIN_ERROR", payload: error });

export const RegisterStart = (user) => ({ type: "REGISTER_START" });
export const RegisterSuccess = () => ({ type: "REGISTER_SUCCESS" });
export const RegisterError = (error) => ({
  type: "REGISTER_ERROR",
  payload: error,
});
export const LoginValidationError = (error) => ({
  type: "REGISTER_VALIDATION_ERROR",
  payload: error,
});
