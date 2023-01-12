import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { app } from '../../firebase';

export const saveMediaToStorage = (media, path) => new Promise((resolve, reject) => {
  const storage = getStorage(app);
  const fileRef = ref(storage, path);

  fetch(media)
    .then(response => response.blob())
    .then(blob => uploadBytes(fileRef, blob))
    .then(() => getDownloadURL(fileRef))
    .then(downloadURL => resolve(downloadURL))
    .catch((e) => reject(e));
});