import React from "react";

import { v4 } from "uuid";
import TextMessage from "../message/TextMessage";
import StickerMessage from "../message/StickerMessage";
import ImageMessage from "../message/ImageMessage";
import RetrieveMessages from "../message/RetrieveMessages";
import VideoMessage from "../message/VideoMessage";
import FileMessage from "../message/FileMesage";
export default function Conversation({ avt, item, index }) {
  switch (item.messageType) {
    case "Text":
      return (
        <TextMessage avt={avt} key={item.id} index={index} message={item} />
      );
    case "STICKER":
      return <StickerMessage avt={avt} key={item.id} sticker={item} />;
    case "PNG":
    case "JPEG":
    case "JPG":
    case "GIF":
      return <ImageMessage avt={avt} key={item.id} image={item} />;
    case "RETRIEVE":
      return <RetrieveMessages avt={avt} key={item.id} message={item} />;
    case "VIDEO":
      return <VideoMessage avt={avt} key={item.id} message={item} />;
    case "DOCX":
    case "DOC":
    case "PDF":
    case "PPT":
    case "PPTX":
    case "TXT":
    case "RAR":
    case "ZIP":
    case "JSON":
    case "CSV":
    case "HTML":
    case "XLS":
    case "XLSX":
      return <FileMessage avt={avt} key={item.id} file={item} />;
    default:
      return <FileMessage avt={avt} key={item.id} file={item} />;
  }
}
