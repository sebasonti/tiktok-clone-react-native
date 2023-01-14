import { saveMediaToStorage } from "./random";
import { app, auth } from '../firebase';
import { getFirestore, updateDoc, doc } from "firebase/firestore";

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