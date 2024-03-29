import { FIREBASE_AUTH } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

var handleVertifi = async (inputPhone) => {
  const captCha = new RecaptchaVerifier(FIREBASE_AUTH, "recaptcha", {
    size: "invisible",
  });
  return await signInWithPhoneNumber(FIREBASE_AUTH, inputPhone, captCha);
};
export { handleVertifi };
