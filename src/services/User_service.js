var getUserById = (id, callBack) => {
  fetch(`https://65e300d088c4088649f526ea.mockapi.io/user/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
        callBack(data)
    });
};
