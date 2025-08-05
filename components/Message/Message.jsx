"use client";
import api_client from "@/api_client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ receiver, admin }) => {
  const [messages, setMessages] = useState([]);
  console.log(receiver, messages);
  const user = useSelector((state) => state?.user?.user);

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
    const data = {
      receiver: receiver, // id of admin is 1
      message_text: e.target.msg_text.value,
    };
    api_client
      .post("http://127.0.0.1:8000/message/", data)
      .then((res) => {
        socketRef.current.send(JSON.stringify(data)); // sending msg to BE
        getMessages();
      })
      .catch((err) => console.log(err))
      .finally(() => (e.target.msg_text.value = " "));
  };

  const socketRef = useRef(null);
  useEffect(() => {
    if (user) {
      socketRef.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/messages/${admin ? receiver : user.id}/`
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket Connected");
      };
      socketRef.current.onclose = () => {
        console.log("WebSocket Disconnected");
      };
      socketRef.current.onmessage = (e) => {
        // receiving msg from BE
        const newData = JSON.parse(e.data);
        console.log(newData);
        setMessages((prev) => [newData, ...prev]);
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [user, receiver]);

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
