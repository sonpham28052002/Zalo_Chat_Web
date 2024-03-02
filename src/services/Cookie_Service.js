import Cookies from "js-cookie";

const createCookie = () => {
  const newCookieValue = {};
  Cookies.set("appchat", JSON.stringify(newCookieValue), { expires: 7 });
};
const handleDeleteCookie = () => {
  Cookies.remove("appchat");
};
const handleGetValueCookie = (callback, setCloseCookie) => {
  const cookie = Cookies.get("appchat");
  if (cookie !== undefined) {
    callback(cookie);
    setCloseCookie(false);
  } else {
    setCloseCookie(true);
  }
};
const handleSetValueCookie = (account) => {
  const cookie = Cookies.get("appchat");
  if (cookie !== undefined) {
    Cookies.set("appchat", JSON.stringify(account), { expires: 7 });
  }
};
export {
  createCookie,
  handleDeleteCookie,
  handleGetValueCookie,
  handleSetValueCookie,
};
