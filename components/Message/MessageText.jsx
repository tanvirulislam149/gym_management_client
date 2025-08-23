"use client";
import React from "react";
import { useSelector } from "react-redux";

const MessageText = ({ m }) => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div>
      <div
        key={m.id}
        className={`chat ${
          m.sender.id === user.id ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-bubble font-normal">{m.message_text}</div>
      </div>
    </div>
  );
};

export default MessageText;
