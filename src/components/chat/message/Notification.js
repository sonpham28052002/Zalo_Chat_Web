import React from "react";

export default function Notification({ notification, seen, conversation }) {
  function getName(id) {
    return conversation.members.filter((item) => item.member.id === id)[0]
      .member.userName;
  }

  function renderNotificon(notification) {
    if (notification.notificationType === "CREATE_GROUP") {
      return getName(notification.sender.id) + " " + notification.content;
    } else if (notification.notificationType === "JOIN_CALL") {
      return getName(notification.sender.id);
    } else if (notification.notificationType === "ADD_MEMBER") {
      return getName(notification.sender.id);
    } else if (notification.notificationType === "OUT_GROUP") {
      return getName(notification.sender.id);
    } else if (notification.notificationType === "GET_OUT_GROUP") {
      return getName(notification.sender.id);
    }
  }

  return (
    <div className="w-full flex flex-row justify-center rotate-180">
      <p className="bg-slate-300 px-3 text-sm rounded-full">
        {renderNotificon(notification)}
      </p>
    </div>
  );
}
