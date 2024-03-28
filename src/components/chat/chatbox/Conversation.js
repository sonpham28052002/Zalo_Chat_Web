import React from "react";

import { v4 } from "uuid";
import TextMessage from "../message/TextMessage";
import StickerMessage from "../message/StickerMessage";
import ImageMessage from "../message/ImageMessage";
export default function Conversation({ item, index, conversation, ownerID }) {
  
  switch (item.messageType) {
    case "Text":
      return <TextMessage key={item.id} index={index} message={item} ownerID={ownerID}/>;
    case "STICKER":
      return <StickerMessage key={item.id} sticker={item} />;
    case "PNG":
    case "JPEG":
    case "JPG":
    case "GIF":
      return <ImageMessage key={item.id} image={item} ownerID={ownerID} />;
    default:
      return <div key={v4()}></div>;
  }
}
