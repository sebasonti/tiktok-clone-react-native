import { app } from '../firebase';
import {
  getFirestore,
  collection,
  getDocs,
  query
} from "firebase/firestore";

export const getPosts = () => new Promise((resolve, reject) => {
  const db = getFirestore(app);
  const postsQuery = query(collection(db, "posts"));
  getDocs(postsQuery)
    .then((snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
      });
      resolve(posts);
    })
    .catch(reject);
});
