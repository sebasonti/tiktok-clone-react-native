import { saveMediaToStorage } from "./random";
import { app, auth } from '../firebase';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
  const userId = auth.currentUser.uid;
  saveMediaToStorage(image, `profileImage/${userId}`,)
    .then(photoURL => {
      const db = getFirestore(app);
      updateDoc(doc(db, "user", userId), { photoURL })
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    })
    .catch((e) => reject(e));
});

export const saveUserField = (field, value) => new Promise((resolve, reject) => {
  const userId = auth.currentUser.uid;
  const db = getFirestore(app);
  updateDoc(doc(db, "user", userId), { [field]: value })
    .then((res) => resolve(res))
    .catch((e) => reject(e));
});

export const getUsersByEmail = (email) => new Promise((resolve, reject) => {
  if (!email) {
    resolve([]);
  }

  const db = getFirestore(app);
  const usersCollection = collection(db, "user");
  const usersQuery = query(
    usersCollection,
    where("email", ">=", email),
    where("email", "<=", email + '\uf8ff')
  );

  onSnapshot(
    usersQuery,
    (snapshot) => {
      const users = snapshot.docs.map(doc => {
        const data = doc.data();
        const uid = doc.id;
        return { uid, ...data }
      });
      resolve(users);
    },
    reject);
});