 const host = process.env.REACT_APP_HOST
var getAccount = (callBack, phone, password) => {
  console.log(`${host}/account/getAccountPhoneAndPassword?phone=${phone}&password=${password}`);
  fetch(`${host}/account/getAccountPhoneAndPassword?phone=${phone}&password=${password}`)
    .then((resp) => resp.json())
    .then((data) => {
      var account = data
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

export { getAccount };
