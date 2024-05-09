import React from "react";

import TextMessage from "../message/TextMessage";
import StickerMessage from "../message/StickerMessage";
import ImageMessage from "../message/ImageMessage";
import RetrieveMessages from "../message/RetrieveMessages";
import VideoMessage from "../message/VideoMessage";
import FileMessage from "../message/FileMesage";
import VioceMessage from "../message/VioceMessage";
import CallSingle from "../message/CallSingle";
import Notification from "../message/Notification";
export default function Conversation({
  avt,
  item,
  index,
  conversation,
  setIsOpenForwardMessage,
  setReplyMessage,
  forcusMessage,
  isOpenEmotion,
  updateMessage,
  seen,
}) {
  switch (item.messageType) {
    case "Text":
      return (
        <TextMessage
          avt={avt}
          key={item.id}
          index={index}
          message={item}
          conversation={conversation}
          setIsOpenForwardMessage={setIsOpenForwardMessage}
          setReplyMessage={setReplyMessage}
          forcusMessage={forcusMessage}
          isOpenEmotion={isOpenEmotion}
          updateMessage={updateMessage}
          seen={seen}
        />
      );
    case "STICKER":
      return (
        <StickerMessage
          avt={avt}
          key={item.id}
          sticker={item}
          conversation={conversation}
          setIsOpenForwardMessage={setIsOpenForwardMessage}
          setReplyMessage={setReplyMessage}
          forcusMessage={forcusMessage}
          isOpenEmotion={isOpenEmotion}
          updateMessage={updateMessage}
          seen={seen}
        />
      );
    case "PNG":
    case "JPEG":
    case "JPG":
    case "GIF":
      return (
        <ImageMessage
          avt={avt}
          key={item.id}
          image={item}
          conversation={conversation}
          setIsOpenForwardMessage={setIsOpenForwardMessage}
          setReplyMessage={setReplyMessage}
          forcusMessage={forcusMessage}
          isOpenEmotion={isOpenEmotion}
          updateMessage={updateMessage}
          seen={seen}
        />
      );
    case "RETRIEVE":
      return (
        <RetrieveMessages
          avt={avt}
          key={item.id}
          message={item}
          conversation={conversation}
          seen={seen}
        />
      );
    case "VIDEO":
      return (
        <VideoMessage
          avt={avt}
          key={item.id}
          video={item}
          conversation={conversation}
          setIsOpenForwardMessage={setIsOpenForwardMessage}
          setReplyMessage={setReplyMessage}
          forcusMessage={forcusMessage}
          isOpenEmotion={isOpenEmotion}
          updateMessage={updateMessage}
          seen={seen}
        />
      );
    case "AUDIO":
      return (
        <VioceMessage
          avt={avt}
          key={item.id}
          vioce={item}
          conversation={conversation}
          setIsOpenForwardMessage={setIsOpenForwardMessage}
          setReplyMessage={setReplyMessage}
          forcusMessage={forcusMessage}
          isOpenEmotion={isOpenEmotion}
          updateMessage={updateMessage}
          seen={seen}
        />
      );
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
      return (
        <FileMessage
          avt={avt}
          key={item.id}
          file={item}
          conversation={conversation}
          setIsOpenForwardMessage={setIsOpenForwardMessage}
          setReplyMessage={setReplyMessage}
          forcusMessage={forcusMessage}
          isOpenEmotion={isOpenEmotion}
          updateMessage={updateMessage}
          seen={seen}
        />
      );
    case "CALLSINGLE":
      return (
        <CallSingle
          avt={avt}
          key={item.id}
          file={item}
          conversation={conversation}
          seen={seen}
        />
      );
    case "NOTIFICATION":
      return (
        <Notification
          seen={seen}
          key={item.id}
          notification={item}
          conversation={conversation}
        />
      );
    default:
      return (
        <FileMessage
          avt={avt}
          key={item.id}
          file={item}
          conversation={conversation}
          setIsOpenForwardMessage={setIsOpenForwardMessage}
          setReplyMessage={setReplyMessage}
          forcusMessage={forcusMessage}
          isOpenEmotion={isOpenEmotion}
          updateMessage={updateMessage}
          seen={seen}
        />
      );
  }
}
