"use client";
import api_client from "@/api_client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ receiver, admin }) => {
  const [messages, setMessages] = useState([]);
  console.log(receiver, messages);
  const user = useSelector((state) => state?.user?.user);
  const messageContainerRef = useRef(null); // 👉 ref on the scrollable box

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      .finally(() => (e.target.msg_text.value = ""));
  };

  const socketRef = useRef(null);
  useEffect(() => {
    if (user) {
      const room = [receiver, user.id].sort();
      socketRef.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/messages/${`${room[0]}and${room[1]}`}/`
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
        setMessages((prev) => [...prev, newData]);
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [user, receiver]);

  return (
    <div className="cursor-default bg-white rounded-2xl">
      <div className="p-2.5 text-xl w-full sticky top-0 left-0 rounded-t-lg bg-green-400">
        <p>Admin</p>
      </div>
      <div ref={messageContainerRef} className="mt-1 overflow-y-auto h-[400px]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat ${
              m.sender.id === user.id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble font-normal">{m.message_text}</div>
          </div>
        ))}
      </div>
      <form
        className="flex border text-black w-full"
        onSubmit={sendMessageHandler}
      >
        <input
          type="text"
          className="input bg-white w-full"
          name="msg_text"
          placeholder="Type here"
        />
        {/* <input className="border" type="text"  id="" /> */}
        <input
          className="border-0 btn bg-green-400 text-black"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Message;
