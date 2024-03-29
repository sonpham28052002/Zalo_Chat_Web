const host = process.env.REACT_APP_HOST;
var getAccount = (callBack, phone, password) => {
  fetch(
    `${host}/account/getAccountPhoneAndPassword?phone=${phone}&password=${password}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      var account = data;
      if (account) {
        callBack(account);
      } else {
        callBack(undefined);
      }
    })
    .catch((error) => {
      console.log("error");
      callBack(undefined);
    });
};
var forgotPasswordAccount = (callBack, id, passwordNew) => {
  fetch(
    `${host}/account/forgotPasswordAccount?id=${id}&passwordNew=${passwordNew}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      callBack(data);
    })
    .catch((error) => {
      callBack(false);
    });
};
export { getAccount, forgotPasswordAccount };
