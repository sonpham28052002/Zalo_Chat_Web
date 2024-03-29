import { FIREBASE_AUTH } from "./firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";

var handleVertifi = async (inputPhone, captCha) => {
  return await signInWithPhoneNumber(FIREBASE_AUTH, inputPhone, captCha);
};
export { handleVertifi };
