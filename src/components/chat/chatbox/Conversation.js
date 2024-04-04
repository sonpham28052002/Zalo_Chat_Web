import React from "react";

import { v4 } from "uuid";
import TextMessage from "../message/TextMessage";
import StickerMessage from "../message/StickerMessage";
import ImageMessage from "../message/ImageMessage";
import RetrieveMessage from "../message/RetrieveMessage";
export default function Conversation({avt, item, index, conversation, ownerID }) {
  
  switch (item.messageType) {
    case "Text":
      return <TextMessage avt={avt} key={item.id} index={index} message={item}/>;
    case "STICKER":
      return <StickerMessage  avt={avt} key={item.id} sticker={item}/>;
    case "PNG":
    case "JPEG":
    case "JPG":
    case "GIF":
      return <ImageMessage  avt={avt} key={item.id} image={item} />;
    case "RETRIEVE":
      return <RetrieveMessage avt={avt} key={item.id} message={item} />
    default:
      return <div key={v4()}></div>;
  }
}
