const host = "https://deploybackend-production.up.railway.app/";
var getInfoUserById = (id, callBack) => {
  console.log(id);
  fetch(`${host}/users/getInfoUserById?id=${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      callBack(data);
    });
};

export { getInfoUserById };
