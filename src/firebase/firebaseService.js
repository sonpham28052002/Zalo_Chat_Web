import { FIREBASE_AUTH } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

var handleVertifi = async (inputPhone) => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        FIREBASE_AUTH,
        "recaptcha",
        {
          size: "invisible",
        }
      );
      await window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    } else {
      window.grecaptcha.reset(window.recaptchaWidgetId);
    }
    return await signInWithPhoneNumber(
      FIREBASE_AUTH,
      inputPhone,
      window.recaptchaVerifier
    );
  } catch (error) {
    if (error.code === "auth/too-many-requests") {
      alert("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
    } else if (error.message.includes("auth/invalid-phone-number")) {
      alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
    }
  }
};
export { handleVertifi };
