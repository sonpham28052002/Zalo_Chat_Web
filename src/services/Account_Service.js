var getAccount = (callBack, phone, password) => {
  fetch("https://65e300d088c4088649f526ea.mockapi.io/Account")
    .then((resp) => resp.json())
    .then((data) => {
      console.log("data");

      var account = data.filter(
        (item) => item.phone === phone && item.password === password
      )[0];
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
