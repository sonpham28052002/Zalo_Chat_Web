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
var getMessageAndMemberByIdSenderAndIdGroup = (idSender, idGroup, callBack) => {
  fetch(
    `${host}/messages/getMessageAndMemberByIdSenderAndIdGroup?idSender=${idSender}&idGroup=${idGroup}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data && data.length > 0) {
        callBack(data);
      } else {
        callBack([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching message:", error);
      callBack(false, null);
    });
};

var getMemberByIdSenderAndIdGroup = async (idSender, idGroup) => {
  try {
    const res = await fetch(
      `${host}/messages/getMemberByIdSenderAndIdGroup?idSender=${idSender}&idGroup=${idGroup}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw error; // Ném lỗi để bên gọi có thể xử lý
  }
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

export {
  getMessageByIdSenderAndIsReceiver,
  deleteMessageByIdOrGroupId,
  getMessageAndMemberByIdSenderAndIdGroup,
  getMemberByIdSenderAndIdGroup,
};
