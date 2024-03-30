const host = process.env.REACT_APP_HOST;
var getInfoUserById = (id, callBack) => {
  fetch(`${host}/users/getInfoUserById?id=${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      callBack(data);
    });
};


export { getInfoUserById };
