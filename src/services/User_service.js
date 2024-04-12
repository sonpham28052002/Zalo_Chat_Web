const host = process.env.REACT_APP_HOST;
var getInfoUserById = (id, callBack) => {
  fetch(`${host}/users/getInfoUserById?id=${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.id) {
        callBack(data);
      } else {
        callBack(undefined);
      }
    })
    .catch((e) => {
      callBack(undefined);
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
};

const getFriendRequestListByOwnerId = async (ownerId) => {
  try {
    const response = await fetch(
      `${host}/users/getFriendRequestListByOwnerId?owner=${ownerId}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {
  getInfoUserById,
  insertUser,
  getUserById,
  updateUserInfo,
  getFriendRequestListByOwnerId,
};
