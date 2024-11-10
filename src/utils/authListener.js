import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config";
import { setUserInfo, clearUserInfo } from "../redux/reducers/authSlice";

export const authStateChanged = (dispatch) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUserInfo({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });

  return unsubscribe;
};
