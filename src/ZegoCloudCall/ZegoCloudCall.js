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
  const appID = 492662668;
  const serverSecret = "c83265c71f8a9156444bf7ddb74a9411";
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
    onIncomingCallReceived: (callID, caller, callType, callees) => {},
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
function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

async function handleSendGroupCall(idGroup, owner, sendMessageCallGroup) {
  const roomID = randomID(25);
  try {
    const appID = 940263346;
    const serverSecret = "a3807f37d7f0eb2f8b31a51d199262e0";

    const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      owner.id,
      owner.userName
    );

    // Create instance object from Kit Token.
    const zp = await ZegoUIKitPrebuilt.create(kitToken);
    let path = window.location.pathname.split("/")[1];
    console.log(roomID);
    // start the call
    var url =
      window.location.protocol +
      "//" +
      window.location.host +
      "/" +
      path +
      "/CallGroup" +
      "?roomID=" +
      roomID;
    await zp.joinRoom({
      container: null,
      showPreJoinView: false,
      sharedLinks: [
        {
          name: "Personal link",
          url: url,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      onJoinRoom: () => {
        console.log("join room success");
      },
      onLeaveRoom: () => {},
    });
    await sendMessageCallGroup(idGroup, owner, url, roomID);
  } catch (error) {
    console.log(error);
  }
  await window.open(url);
  const urlreback =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  console.log(urlreback);
  await window.location.assign(urlreback);
}

export {
  ZegoCloudCall,
  updateZegoCloud,
  initZegoCloudCall,
  handleSendSingleCall,
  handleSendGroupCall,
};
