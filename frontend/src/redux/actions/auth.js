import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { app, auth } from "../../firebase";
import { AUTH_STATE_CHANGE } from "../constants";
import { getPosts } from "./post";

export const getCurrentUserData = (uid) => dispatch => {
  const db = getFirestore(app);
  const userDoc = doc(db, "user", uid);
  onSnapshot(userDoc,
    (snapshot) => {
      if (snapshot.exists) {
        return dispatch({
          type: AUTH_STATE_CHANGE,
          payload: {
            currentUser: snapshot.data(),
            loaded: true
          }
        });
      }
    },
    (error) => {
      console.log("Loading user...", error);
    });
}

export const userAuthStateListener = () => dispatch => {
  onAuthStateChanged(auth,
    (user) => {
      if (user) {
        dispatch(getCurrentUserData(user.uid));
        dispatch(getPosts(user.uid));
      } else {
        dispatch({
          type: AUTH_STATE_CHANGE,
          payload: {
            currentUser: null,
            loaded: true
          }
        });
      }
    });
}

export const login = (email, password) => dispatch => new Promise((resolve, reject) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => resolve())
    .catch((e) => reject(e));
});

export const logout = () => dispatch => new Promise((resolve, reject) => {
  signOut(auth)
    .then(() => resolve())
    .catch((e) => reject(e));
});

export const register = (email, password) => dispatch => new Promise((resolve, reject) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => resolve())
    .catch((e) => reject(e));
});