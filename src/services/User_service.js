const host = process.env.REACT_APP_HOST;
var getInfoUserById = (id, callBack) => {
  fetch(`${host}/users/getInfoUserById?id=${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      callBack(data);
    });
};

var insertUser = async (user) => {
  try {
    const response = await fetch(`${host}/users/insertUser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

var getUserById = async (id) => {
  try {
    const response = await fetch(`${host}/users/getUserById?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateUserInfo = async (user) => {
  try {
    const response = await fetch(`${host}/users/updateUser`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}




export { getInfoUserById,insertUser, getUserById, updateUserInfo };
