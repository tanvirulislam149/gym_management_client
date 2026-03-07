"use client";
import useMarkAsRead from "@/hooks/markMsgRead";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { IoCheckmarkDoneSharp, IoCheckmarkOutline } from "react-icons/io5";

const MessageItem = ({ message, convo, admin }) => {
  const ref = useRef(null);
  const user = useSelector((state) => state?.user?.user);

  // Hook will auto-mark message as read when visible
  useMarkAsRead(ref, message);

  // console.log(message);
  return (
    <div
      ref={ref}
      key={message.id}
      className={`chat ${
        message.message_sender === convo?.sender.id
          ? admin
            ? "chat-start"
            : "chat-end"
          : admin
            ? "chat-end"
            : "chat-start"
      }`}
    >
      <div className="chat-bubble font-normal flex">
        <p>{message.message_text} </p>
        <small className="mt-3 ml-2">
          {!admin ? (
            message.message_sender === convo?.sender.id ? (
              message.is_read ? (
                <IoCheckmarkDoneSharp className="text-green-400 h-3.5 w-3.5" />
              ) : (
                <IoCheckmarkOutline className="h-3.5 w-3.5" />
              )
            ) : (
              ""
            )
          ) : message.message_sender !== convo?.sender.id ? (
            message.is_read ? (
              <IoCheckmarkDoneSharp className="text-green-400 h-3.5 w-3.5" />
            ) : (
              <IoCheckmarkOutline className="h-3.5 w-3.5" />
            )
          ) : (
            ""
          )}
        </small>
      </div>
    </div>
  );
};

export default MessageItem;
