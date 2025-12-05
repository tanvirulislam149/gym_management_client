"use client";
import api_client from "@/api_client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import MessageText from "./MessageText";

const Message = ({ receiver, admin, handleMarkRead }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let timeoutId;
    if (user) {
      api_client
        .get(
          `https://gym-management-henna.vercel.app/message/?receiver=${receiver}`
        )
        .then((res) => {
          setMessages(res.data);
          setLoading(false);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            timeoutId = setTimeout(getMessages, 2000);
          }
        });
    }
  };

  useEffect(() => {
    getMessages();
  }, [receiver]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    console.log(receiver);
    const data = {
      receiver: receiver, // id of admin is 1
      message_text: e.target.msg_text.value,
    };
    console.log(data);
    api_client
      .post("https://gym-management-henna.vercel.app/message/", data)
      .then((res) => {
        socketRef.current.send(JSON.stringify(data)); // sending msg to BE
        // getMessages();
      })
      .catch((err) => console.log(err))
      .finally(() => (e.target.msg_text.value = ""));
  };

  const socketRef = useRef(null);
  useEffect(() => {
    if (user) {
      const room = [receiver, user.id].sort();
      socketRef.current = new WebSocket(
        `wss://gym-management-0fmi.onrender.com/ws/messages/${`${room[0]}and${room[1]}`}/`
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

        if (admin && newData.receiver.id == 1) {
          handleMarkRead(newData.sender.id);
        }
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [user, receiver]);

  return (
    <div className="cursor-default bg-black rounded-t-lg rounded-2xl w-full border-1 border-gray-600">
      <div className="p-2.5 text-xl w-full sticky border-b-1 border-gray-600 text-white top-0 left-0 bg-black rounded-t-lg">
        {admin ? messages[0]?.sender?.email : <p>Chat with Admin</p>}
      </div>
      {loading ? (
        <div className="h-96 flex justify-center">
          <span className="loading loading-spinner text-white my-40 loading-xl"></span>
        </div>
      ) : (
        <div
          ref={messageContainerRef}
          className="mt-1 overflow-y-auto h-[400px] bg-black"
        >
          <div className="chat chat-start">
            {!admin && <div className="chat-bubble">How can I help you?</div>}
          </div>
          {messages.map((m) => (
            <div key={m.id}>
              <MessageText message={m} />
            </div>
          ))}
        </div>
      )}
      <form
        className="flex text-white w-full p-1 border-t-1 border-gray-600"
        onSubmit={sendMessageHandler}
      >
        <input
          type="text"
          className="input bg-black w-full focus:outline-none focus:shadow-none border-0 ring-0"
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
