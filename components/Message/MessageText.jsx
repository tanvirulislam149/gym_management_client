"use client";
import useMarkAsRead from "@/hooks/markMsgRead";
import { useRef } from "react";
import { useSelector } from "react-redux";

const MessageItem = ({ message }) => {
  const ref = useRef(null);
  const user = useSelector((state) => state?.user?.user);

  // Hook will auto-mark message as read when visible
  useMarkAsRead(ref, message);

  return (
    <div
      ref={ref}
      key={message.id}
      className={`chat ${
        message.sender.id === user.id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-bubble font-normal">{message.message_text}</div>
    </div>
  );
};

export default MessageItem;
