"use client";
import api_client from "@/api_client";
import React, { useEffect, useState } from "react";

const Message = ({ receiver }) => {
  const [messages, setMessages] = useState([]);
  console.log(receiver, messages);

  const getMessages = () => {
    api_client
      .get(`http://127.0.0.1:8000/message/?receiver=${receiver}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMessages();
  }, [receiver]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    api_client
      .post("http://127.0.0.1:8000/message/", {
        receiver: receiver, // id of admin is 1
        message_text: e.target.msg_text.value,
      })
      .then((res) => getMessages())
      .catch((err) => console.log(err))
      .finally(() => (e.target.msg_text.value = " "));
  };
  return (
    <div>
      <div>
        <p>sender: {messages[0]?.sender?.email}</p>
        <p>receiver: {messages[0]?.receiver?.email}</p>
      </div>
      <div>
        {messages.map((m) => (
          <li key={m.id}>{m.message_text}</li>
        ))}
      </div>
      <form onSubmit={sendMessageHandler}>
        <input className="border" type="text" name="msg_text" id="" />
        <input className="border" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Message;
