import { createContext, useReducer } from "react";
import { AuthReducer } from "./authReducer";

const initialState = {
  user: null,
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
