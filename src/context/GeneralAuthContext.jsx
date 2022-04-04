import { createContext, useState } from "react";
import * as firebaseApp from "../firebase/configFirebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
export const GeneralAuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(firebaseApp.auth, (newUser) => {
    setUser(newUser);
  });
  const singUpWithEmail = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(firebaseApp.auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(firebaseApp.auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };
  const logOut = async () => {
    try {
      await signOut(firebaseApp.auth);
    } catch (err) {
      console.log(err.message);
    }
  };
  const data = {
    user: user,
    singUpWithEmail: singUpWithEmail,
    loginWithEmail: loginWithEmail,
    logOut: logOut,
  };
  return <GeneralAuthContext.Provider value={data}>{children}</GeneralAuthContext.Provider>;
};

export default AuthProvider;
