import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { ZIM } from "zego-zim-web";
import { stompClient } from "../socket/socket";

var ZegoCloudCall = undefined;
function updateZegoCloud(value) {
  ZegoCloudCall = value;
  return ZegoCloudCall;
}

async function initZegoCloudCall(owner) {
  const userID = owner.id;
  const userName = owner.userName;
  const appID = 1532398834;
  const serverSecret = "df5e8d723e44364f8e74237831ca7159";
  const TOKEN = await ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );
  try {
    var ZegoCloudCall = await ZegoUIKitPrebuilt.create(TOKEN);
    await ZegoCloudCall?.addPlugins({ ZIM });
  } catch (error) {
    console.log(error);
  }

  ZegoCloudCall.setCallInvitationConfig({
    ringtoneConfig: {
      incomingCallUrl: require("../assets/ringtone-205162.mp3"),
      outgoingCallUrl: require("../assets/happy-pop-1-185286.mp3"),
    },
    onIncomingCallReceived: (callID, caller, callType, callees) => {
    },
    onSetRoomConfigBeforeJoining: (callType) => {
      if (callType === 0) {
        return {
          showScreenSharingButton: false,
          showAudioVideoSettingsButton: false,
          showMyCameraToggleButton: false,
          turnOnCameraWhenJoining: false,
          showTextChat: false,
          showUserList: false,
        };
      } else {
        return {
          showScreenSharingButton: false,
          showAudioVideoSettingsButton: false,
          showMyCameraToggleButton: true,
          turnOnCameraWhenJoining: true,
          showTextChat: false,
          showUserList: false,
        };
      }
    },
    onCallInvitationEnded: () => {},
  });
  updateZegoCloud(ZegoCloudCall);
}

function handleSendSingleCall(callType, userReceiver, userSender) {
  var arrUser = [];

  const targetUserWeb = {
    userID: userReceiver.id,
    userName: userReceiver.userName,
  };
  var dateStart = new Date();

  ZegoCloudCall?.sendCallInvitation({
    callees: [targetUserWeb],
    callType: callType,
    timeout: 10,
    onSetRoomConfigBeforeJoining: (callType) => {
      if (callType === 0) {
        return {
          showScreenSharingButton: false,
          showAudioVideoSettingsButton: false,
          showMyCameraToggleButton: false,
          turnOnCameraWhenJoining: false,
          showTextChat: false,
          showUserList: false,
        };
      } else {
        return {
          showScreenSharingButton: false,
          showAudioVideoSettingsButton: false,
          showMyCameraToggleButton: true,
          turnOnCameraWhenJoining: true,
          showTextChat: false,
          showUserList: false,
        };
      }
    },
  })
    .then((res) => {
      console.warn(res);
    })
    .catch((err) => {
      console.warn(err);
    });
  ZegoCloudCall?.setCallInvitationConfig({
    // xữ lý từ chối cuộc gọi
    onOutgoingCallDeclined: () => {
      let title = "";
      if (callType === 0) {
        title = "thoại";
      } else {
        title = "video";
      }
      const mess = {
        id: v4(),
        messageType: "CALLSINGLE",
        sender: { id: userSender.id },
        receiver: { id: userReceiver.id },
        seen: [
          {
            id: userSender.id,
          },
        ],
        size: undefined,
        titleFile: " từ chối cuộc gọi " + title + " từ ",
        url: undefined,
        idGroup: "",
        react: [],
      };
      stompClient.send("/app/private-single-message", {}, JSON.stringify(mess));
    },
    // xữ lý khi chấp nhận cuộc gọi
    onOutgoingCallAccepted: (callID, callee) => {
      console.log("in call 1");
      console.log(callee);
      arrUser.push(callee);
    },

    onCallInvitationEnded: (reason, data) => {
      console.log(reason);
      var dateEnd = new Date();
      var difference = Math.abs(dateStart.getTime() - dateEnd.getTime()) / 1000;
      console.log(difference);
      if (reason === "LeaveRoom") {
        let title = "";
        if (callType === 0) {
          title = "thoại";
        } else {
          title = "video";
        }
        const mess = {
          id: v4(),
          messageType: "CALLSINGLE",
          sender: { id: userSender.id },
          receiver: { id: userReceiver.id },
          seen: [
            {
              id: userSender.id,
            },
          ],
          size: difference,
          titleFile: "Cuộc gọi " + title + " từ ",
          url: undefined,
          idGroup: "",
          react: [],
        };
        stompClient.send(
          "/app/private-single-message",
          {},
          JSON.stringify(mess)
        );
      } else if (reason === "Timeout") {
        let title = "";
        if (callType === 0) {
          title = "thoại";
        } else {
          title = "video";
        }
        const mess = {
          id: v4(),
          messageType: "CALLSINGLE",
          sender: { id: userSender.id },
          receiver: { id: userReceiver.id },
          seen: [
            {
              id: userSender.id,
            },
          ],
          size: undefined,
          titleFile: "bị nhở cuộc gọi " + title + " từ ",
          url: undefined,
          idGroup: "",
          react: [],
        };

        stompClient.send(
          "/app/private-single-message",
          {},
          JSON.stringify(mess)
        );
      }
    },
  });
}

function handleSendGroupCall(callType, ArrUserReceiver, idGroup, owner) {
  var arrUser = [];
  var dateStart = new Date();

  try {
    ZegoCloudCall?.sendCallInvitation({
      callees: ArrUserReceiver,
      callType: callType,
      timeout: 10,
      onSetRoomConfigBeforeJoining: (callType) => {
        if (callType === 0) {
          return {
            showScreenSharingButton: false,
            showAudioVideoSettingsButton: false,
            showMyCameraToggleButton: false,
            turnOnCameraWhenJoining: false,
            showTextChat: false,
            showUserList: false,
          };
        } else {
          return {
            showScreenSharingButton: false,
            showAudioVideoSettingsButton: false,
            showMyCameraToggleButton: true,
            turnOnCameraWhenJoining: true,
            showTextChat: false,
            showUserList: false,
          };
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
  ZegoCloudCall?.setCallInvitationConfig({
    // xữ lý từ chối cuộc gọi
    onOutgoingCallDeclined: () => {},
    // xữ lý khi chấp nhận cuộc gọi
    onOutgoingCallAccepted: (callID, callee) => {
      console.log("in call 1");
      console.log(callee);
      arrUser.push(callee);
    },
    onCallInvitationEnded: (reason, data) => {
      //   console.log(reason);
      //   var dateEnd = new Date();
      //   var difference = Math.abs(dateStart.getTime() - dateEnd.getTime()) / 1000;
      //   console.log(difference);
      //   if (reason === "LeaveRoom") {
      //     let title = "";
      //     if (callType === 0) {
      //       title = "thoại";
      //     } else {
      //       title = "video";
      //     }
      //     const mess = {
      //       id: v4(),
      //       messageType: "CALLGROUP",
      //       sender: { id: owner.id },
      //       receiver: { id: `group_${idGroup}` },
      //       seen: [
      //         {
      //           id: owner.id,
      //         },
      //       ],
      //       size: difference,
      //       titleFile: "Cuộc gọi " + title + " từ ",
      //       url: undefined,
      //       idGroup: "",
      //       react: [],
      //     };
      //     stompClient.send(
      //       "/app/private-single-message",
      //       {},
      //       JSON.stringify(mess)
      //     );
      //   } else if (reason === "Timeout") {
      //     let title = "";
      //     if (callType === 0) {
      //       title = "thoại";
      //     } else {
      //       title = "video";
      //     }
      //     const mess = {
      //       id: v4(),
      //       messageType: "CALLGROUP",
      //       sender: { id: owner.id },
      //       receiver: { id: `group_${idGroup}` },
      //       seen: [
      //         {
      //           id: owner.id,
      //         },
      //       ],
      //       size: undefined,
      //       titleFile: "bị nhở cuộc gọi " + title + " từ ",
      //       url: undefined,
      //       idGroup: "",
      //       react: [],
      //     };
      //     stompClient.send(
      //       "/app/private-single-message",
      //       {},
      //       JSON.stringify(mess)
      //     );
      //   }
    },
  });
}

export {
  ZegoCloudCall,
  updateZegoCloud,
  initZegoCloudCall,
  handleSendSingleCall,
  handleSendGroupCall,
};
