import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { LeaveRoom } from "../../../socket/socket";

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

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}
export default function CallGroup() {
  var owner = useSelector((state) => state.data);
  let myMeeting = async (element) => {
    // generate Kit Tokenb
    try {
      const appID = 940263346;
      const serverSecret = "a3807f37d7f0eb2f8b31a51d199262e0";
      const roomID =
        (await getUrlParams().get("roomID")) || (await randomID(25));

      const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        owner.id,
        owner.userName
      );

      // Create instance object from Kit Token.
      const zp = await ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      var url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID;
      await zp.joinRoom({
        container: element,
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
        onLeaveRoom: () => {
          console.log("leave room success");
          LeaveRoom(roomID, owner.id);
          window.close();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
