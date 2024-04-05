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

const deleteMessageByIdOrGroupId = async (message, ownerId, idGroup) => {
  try {
    const res = await fetch(
      `${host}/messages/deleteMessageByIdOrGroupId?ownerId=${ownerId}&idGroup=${idGroup}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { getMessageByIdSenderAndIsReceiver, deleteMessageByIdOrGroupId };
