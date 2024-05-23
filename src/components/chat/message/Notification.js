import React from "react";

export default function Notification({ notification, seen, conversation }) {
  function getName(id) {
    return conversation?.members?.filter((item) => item.member.id === id)[0]
      .member.userName;
  }

  function renderNotificon(notification) {
    if (notification.notificationType === "CREATE_GROUP") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {
            <span className="font-medium">
              {getName(notification.sender.id)}
            </span>
          }
          {" " + notification.content}
        </p>
      );
    } else if (notification.notificationType === "JOIN_CALL") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {
            <span className="font-medium">
              {getName(notification.sender.id)}
            </span>
          }
          {" " + notification.content}
        </p>
      );
    } else if (notification.notificationType === "ADD_MEMBER") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {<span className="font-medium">{getName(notification.user.id)}</span>}
          {" " + notification.content + " "}
          <span className="font-medium">{getName(notification.sender.id)}</span>
        </p>
      );
    } else if (notification.notificationType === "OUT_CALL") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {
            <span className="font-medium">
              {getName(notification.sender.id)}
            </span>
          }
          {" " + notification.content}
        </p>
      );
    } else if (notification.notificationType === "GET_OUT_GROUP") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {<span className="font-medium">{getName(notification.user.id)}</span>}
          {" " + notification.content + " "}
          <span className="font-medium">{getName(notification.sender.id)}</span>
        </p>
      );
    } else if (notification.notificationType === "LEADER_OUT_GROUP") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {<span className="font-medium">{getName(notification.sender.id)}</span>}
          {" " + notification.content + " "}
          <span className="font-medium">{getName(notification.user.id)}</span>
        </p>
      );
    } else if (notification.notificationType === "OUT_GROUP") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {
            <span className="font-medium">
              {getName(notification.sender.id)}
            </span>
          }
          {" " + notification.content}
        </p>
      );
    } else if (notification.notificationType === "CHANGE_ROLE") {
      return (
        <p className="bg-slate-300 px-3 w-fit text-sm rounded-full">
          {
            <span className="font-medium">
              {getName(notification.sender.id)}
            </span>
          }
          {" " + notification.content + " "}
          <span className="font-medium">{getName(notification.user.id)}</span>
        </p>
      );
    }
  }

  function renderSeen(message) {
    const arrSeen = seen.filter((item) => item.indexMessage === message.id);
    return arrSeen.map((item, index) => (
      <img
        key={index}
        src={item.user.avt}
        alt=""
        className="h-4 w-4 rounded-full shadow-lg border-white border mx-[1px]"
      />
    ));
  }

  return (
    <div className="w-full flex flex-col justify-center rotate-180">
      <div className="w-full  flex flex-row justify-center">
        {renderNotificon(notification)}
      </div>
      <div className="flex flex-row w-full justify-end mt-2 items-center px-2">
        {renderSeen(notification)}
      </div>
    </div>
  );
}
