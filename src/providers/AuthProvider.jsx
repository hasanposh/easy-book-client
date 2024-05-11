import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider 
} from "firebase/auth";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const GitHubProvider = new GithubAuthProvider ();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name, photoURL) => {
    // setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider);
  };
  const signInWithGitHub = () => {
    setLoading(true);
    signInWithPopup(auth, GitHubProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

 

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUSer) => {
      console.log("auth state", currentUSer);
      setUser(currentUSer);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signInUser,
    signOutUser,
    updateUserProfile,
    loading,
    setLoading,
    setUser,
    signInWithGoogle,
    signInWithGitHub,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;