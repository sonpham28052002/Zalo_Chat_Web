import Cookies from "js-cookie";

const createCookie = (cookieName) => {
  const newCookieValue = {};
  Cookies.set(cookieName, JSON.stringify(newCookieValue), {
    expires: 7,
  });
};
const handleDeleteCookie = (cookieName) => {
  Cookies.remove(cookieName);
};
const handleGetValueCookie = (cookieName, callback, setCloseCookie) => {
  const cookie = Cookies.get(cookieName);
  if (cookie !== undefined) {
    callback(JSON.parse(cookie));
    setCloseCookie(false);
  } else {
    setCloseCookie(true);
  }
};
const handleSetValueCookie = (cookieName, account) => {
  const cookie = Cookies.get(cookieName);
  if (cookie !== undefined) {
    Cookies.set(cookieName, JSON.stringify(account), { expires: 7 });
  }
};
export {
  createCookie,
  handleDeleteCookie,
  handleGetValueCookie,
  handleSetValueCookie,
};
