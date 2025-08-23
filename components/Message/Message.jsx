"use client";
import api_client from "@/api_client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import MessageText from "./MessageText";

const Message = ({ receiver, admin }) => {
  const [messages, setMessages] = useState([]);
  console.log(receiver, messages);
  const user = useSelector((state) => state?.user?.user);
  const messageContainerRef = useRef(null); //  ref on the scrollable box

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
  console.log(admin);

  return (
    <div className="cursor-default bg-white rounded-2xl w-full">
      <div className="p-2.5 text-xl w-full sticky text-black top-0 left-0 rounded-t-lg bg-green-400">
        {admin ? messages[0]?.sender?.email : <p>Chat with Admin</p>}
      </div>
      <div ref={messageContainerRef} className="mt-1 overflow-y-auto h-[400px]">
        <div className="chat chat-start">
          <div className="chat-bubble">How can I help you?</div>
        </div>
        {messages.map((m) => (
          <div key={m.id}>
            <MessageText message={m} />
          </div>
        ))}
      </div>
      <form
        className="flex border text-black w-full p-1"
        onSubmit={sendMessageHandler}
      >
        <input
          type="text"
          className="input bg-white w-full focus:outline-none focus:ring-0"
          name="msg_text"
          placeholder="Type here"
          autoComplete="off"
        />
        <button
          type="submit"
          className="border-0 btn bg-green-400 text-black rounded-full"
        >
          <IoSend className="w-6 h-6 ml-1" />
        </button>
      </form>
    </div>
  );
};

export default Message;
