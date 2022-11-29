import {
  addDoc,
  collection,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from ".";

export const add = async (collectionName: string, data: object) => {
  return addDoc(collection(db, collectionName), data).then((docRef) => {
    return { ...data, id: docRef.id };
  });
};

export const whereQuery = async (
  collectionName: string,
  field: string,
  value: string
) => {
  return getDocs(
    query(collection(db, collectionName), where(field, "==", value))
  ).then((querySnapshot) => {
    let results: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (data) {
        data = { ...data, id: doc.id };
      }
      results.push(data);
    });
    return results;
  });
};

export const get = async (collectionName: string, documentId: string) => {
  return getDoc(doc(db, collectionName, documentId)).then((docSnap) => {
    return docSnap.data();
  });
};

export const set = async (
  collectionName: string,
  documentId: string,
  data: object
) => {
  return setDoc(doc(db, collectionName, documentId), data, {
    merge: true,
  }).then(() => {
    return;
  });
};

export const upload = async (
  file: File,
  existingRef: string | undefined = undefined
) => {
  const imageRef = existingRef || `${file.name.split(".")[0]}-${Date.now()};`;
  const storageRef = ref(storage, imageRef);
  return uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref).then((downloadURL) => {
      return { url: downloadURL, ref: imageRef };
    });
  });
};

export const getAll = async (collectionName: string) => {
  return getDocs(collection(db, collectionName)).then((querySnapshot) => {
    let results: Array<DocumentData> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if (data) {
        Object.assign(data, { id: doc.id });
      }
      results.push(data);
    });
    return results;
  });
};

export const remove = async (collectionName: string, documentId: string) => {
  return deleteDoc(doc(db, collectionName, documentId));
}