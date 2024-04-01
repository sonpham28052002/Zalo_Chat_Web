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
  console.log(id);
  console.log(passwordNew);
  fetch(
    `${host}/account/forgotPasswordAccount?id=${id}&passwordNew=${passwordNew}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      callBack(data);
    })
    .catch((error) => {
      callBack(false);
    });
};

var getAccountByPhone = async (phone) => {
  try {
    const response = await fetch(
      `${host}/account/getAccountByPhone?phone=${phone}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

var registerAccount = async (account) => {
  try {
    const response = await fetch(`${host}/account/registerAccount`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

var checkNumberPhoneExist = async (phone) => {
  // return false if not exist, return object if exist
  try {
    const response = await fetch(
      `${host}/account/getAccountByPhone?phone=${phone}`
    );
    try {
      const data = await response.json();
      if (data.status === 500) {
        console.log("2 account");
        return data.status;
      }
      return data;
    } catch (error) {
      return false;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

export {
  getAccount,
  forgotPasswordAccount,
  registerAccount,
  checkNumberPhoneExist,
  getAccountByPhone,
};
