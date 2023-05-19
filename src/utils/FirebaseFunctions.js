import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "./Firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { userTypes } from "./enums";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const handleRegistration = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: formData.name,
    });
    await setDoc(doc(db, "users", user.uid), {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      type: userTypes.citizen,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const isOfficial = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);
  const userData = userDocSnapshot.data();
  const userType = userData.type;
  if (userType === userTypes.official) {
    return true;
  } else {
    return false;
  }
};

export const handleLogin = async (formData) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    const isOfficialUser = await isOfficial(user.uid);
    return { ...user, official: isOfficialUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createComplaint = async (formData, media) => {
  const timestamp = Date.now();
  const fileName = `${timestamp}`;
  const fileRef = ref(storage, `${timestamp}.${media.name.split(".")[1]}`);
  try {
    await uploadBytes(fileRef, media);
    const fileLink = await getDownloadURL(fileRef);
    const updatedFormData = { ...formData, timestamp, mediaPath: fileLink };
    await addDoc(collection(db, "complaints"), updatedFormData);
  } catch (error) {
    throw new Error(error.message);
  }
};
