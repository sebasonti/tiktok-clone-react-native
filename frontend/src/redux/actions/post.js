import uuid from 'uuid-random';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { app, auth } from "../../firebase";
import { saveMediaToStorage } from './random';
import { CURRENT_USER_POSTS_UPDATE } from '../constants';

export const createPost = (description, video, thumbnail) => dispatch => new Promise((resolve, reject) => {
  const userId = auth.currentUser.uid;
  const videoId = uuid();

  const savePromises = Promise.all([
    saveMediaToStorage(video, `post/${userId}/${videoId}/video`),
    saveMediaToStorage(thumbnail, `post/${userId}/${videoId}/thumbnail`)
  ])

  savePromises
    .then((mediaURL) => {
      const post = {
        userId,
        videoURL: mediaURL[0],
        thumbnailURL: mediaURL[1],
        description,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp()
      };
      const db = getFirestore(app);
      addDoc(collection(db, "posts"), post)
        .then((ref) => resolve(ref))
        .catch((e) => reject(e));
    })
    .catch((e) => reject(e));
});

export const getPosts = (uid) => dispatch => new Promise((resolve, reject) => {
  const db = getFirestore(app);
  const postsCollection = collection(db, "posts");
  const postsQuery = query(
    postsCollection,
    where("userId", "==", uid),
    orderBy('createdAt', 'desc')
  );

  onSnapshot(
    postsQuery,
    (snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
      });
      console.log(posts);
      dispatch({
        type: CURRENT_USER_POSTS_UPDATE,
        payload: { posts }
      });
    },
    (error) => {
      console.log("Loading posts...", error);
    });
});