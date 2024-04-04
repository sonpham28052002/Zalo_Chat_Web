const host = process.env.REACT_APP_HOST;
var getMessageByIdSenderAndIsReceiver = (idSender, idReceiver, callBack) => {
  fetch(
    `${host}/messages/getMessageByIdSenderAndIsReceiver?idSender=${idSender}&idReceiver=${idReceiver}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      callBack(data);
    });
};
export { getMessageByIdSenderAndIsReceiver };
