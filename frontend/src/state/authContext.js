import { createContext, useReducer } from "react";
import { AuthReducer } from "./authReducer";

const initialState = {
  // TODO 後で修正
  // user: null,
  user: {
    _id: "64df50c6cefda32195638a05",
    username: "ねこ",
    email: "eri@gmeil.com",
    password: "adcdef",
    profilePicture: "/person/1.jpeg",
    caverPicture: "/post/1.jpeg",
    followers: ["64e345f498516331a9736a9b"],
    followings: ["64e345f498516331a9736a9b"],
    isAdmin: false,
  },
  isRegister: false,
  isFetching: false,
  error: false,
  validationError: false,
};

// 初期値のStateをアプリ内のどこからでも使えるように宣言する
export const AuthContext = createContext(initialState);

// reducerと初期stateから、現在のstateとdispatchが使えるようになる。
// index.jsに定義することで、Appつまりアプリ全体からvalueの値が使えるようになる。
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isRegister: state.isRegister,
        isFetching: state.isFetching,
        error: state.error,
        validationError: state.validationError,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
