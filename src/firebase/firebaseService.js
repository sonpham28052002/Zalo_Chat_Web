import { FIREBASE_AUTH } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const recreateRecaptchaVerifier = async () => {
  window.recaptchaVerifier = new RecaptchaVerifier(FIREBASE_AUTH, "recaptcha", {
    size: "invisible",
  });
  await window.recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
};

var handleVertifi = async (inputPhone) => {
  try {
    if (!window.recaptchaVerifier) {
      await recreateRecaptchaVerifier();
    } else {
      await window.grecaptcha.reset(window.recaptchaWidgetId);
    }
    return await signInWithPhoneNumber(
      FIREBASE_AUTH,
      inputPhone,
      window.recaptchaVerifier
    );
  } catch (error) {
    console.log(error);
    if (error.code === "auth/too-many-requests") {
      alert("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
    } else if (error.message.includes("auth/invalid-phone-number")) {
      alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
    } else if (
      error.message.includes("reCAPTCHA client element has been removed")
    ) {
      await recreateRecaptchaVerifier();
      return await signInWithPhoneNumber(
        FIREBASE_AUTH,
        inputPhone,
        window.recaptchaVerifier
      );
    } else if (error.code === "auth/quota-exceeded") {
      alert(
        "Quá hạn ngạch của dịch vụ xác thực. hiện tại không thể thực hiện trong khoản thời gian này"
      );
    }
  }
};
export { handleVertifi };
