export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        validationError: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        validationError: false,
      };
    case "LOGIN_ERROR":
    case "REGISTER_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        validationError: false,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        isRegister: true,
        isFetching: false,
        error: false,
        validationError: false,
      };
    case "REGISTER_VALIDATION_ERROR":
      return {
        user: null,
        isFetching: false,
        error: false,
        validationError: true,
      };
    default:
      return state;
  }
};
