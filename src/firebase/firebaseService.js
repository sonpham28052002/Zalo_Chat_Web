import { FIREBASE_AUTH } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
var handleVertifi = async (inputPhone, idRecaptcha) => {
  let captCha = new RecaptchaVerifier(FIREBASE_AUTH, idRecaptcha, {
    size: "invisible",
  });
  return await signInWithPhoneNumber(FIREBASE_AUTH, inputPhone, captCha);
};
export { handleVertifi };
