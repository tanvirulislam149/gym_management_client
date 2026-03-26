"use client";
import api_client from "@/api_client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import MessageText from "./MessageText";
import Button from "../Button/Button";

const Message = ({ selected_convo, admin, handleMarkRead }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [convo, setConvo] = useState([]);
  const [convoNull, setConvoNull] = useState(true);
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
          `https://gym-management-0fmi.onrender.com/message/?convo_id=${admin ? selected_convo.id : convo[0].id}`,
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
  const startConvoHandler = () => {
    api_client
      .post("https://gym-management-0fmi.onrender.com/conversations/")
      .then((res) => {
        setConvoNull(false);
        setConvo([res.data]);
      })
      .catch((err) => console.log(err));
  };

  const get_convo = () => {
    let timeoutId;
    api_client
      .get("https://gym-management-0fmi.onrender.com/conversations/")
      .then((res) => {
        if (res.data.length) {
          setConvoNull(false);
          setConvo(res.data);
          getMessages();
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        } else {
          admin === false && setConvoNull(true);
        }
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          timeoutId = setTimeout(get_convo, 2000);
        }
      });
  };
  console.log(messages);

  useEffect(() => {
    setLoading(true);
    if (admin) {
      setConvoNull(false);
      setConvo([selected_convo]);
      getMessages();
      // setLoading(false);
    } else {
      get_convo();
      setLoading(false);
    }
  }, [selected_convo, convo.length, user]);

  const socketRef = useRef(null);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const data = {
      type: "send_message", // for websocket must add
      conversation: convo[0].id,
      message_sender: user.id,
      message_text: e.target.msg_text.value,
    };
    socketRef.current.send(JSON.stringify(data)); // sending msg to BE
    api_client
      .post("https://gym-management-0fmi.onrender.com/message/", data)
      .then((res) => {
        // socketRef.current.send(JSON.stringify(data)); // sending msg to BE
        // getMessages();
      })
      .catch((err) => console.log(err))
      .finally(() => (e.target.msg_text.value = ""));
  };

  useEffect(() => {
    if (user) {
      // const room = [selected_convo, user.id].sort();
      // socketRef.current = new WebSocket(
      //   `wss://gym-management-0fmi.onrender.com/ws/messages/${`${room[0]}and${room[1]}`}/`,
      // );
      socketRef.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/messages/${admin ? selected_convo.sender.id : user.id}/`,
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
      };
      socketRef.current.onclose = () => {
        console.log("WebSocket Disconnected");
      };
      console.log("check msgs", messages);
      socketRef.current.onmessage = (e) => {
        // receiving msg from BE
        let newData = JSON.parse(e.data);
        if (newData.type === "msg_read") {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newData.id ? { ...msg, is_read: true } : msg,
            ),
          );
        } else {
          setMessages((prev) => [...prev, newData]);
        }

        // if (admin && newData.type !== "msg_read") {
        //   handleMarkRead(newData.conversation);
        // }
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [user, selected_convo]);

  return (
    <div className="cursor-default bg-black rounded-t-lg rounded-2xl w-full border-1 border-gray-600">
      <div className="p-2.5 text-xl w-full sticky border-b-1 border-gray-600 text-white top-0 left-0 bg-black rounded-t-lg">
        {admin ? (
          messages[0]?.conversation?.sender?.email
        ) : (
          <p>Chat with Admin</p>
        )}
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
          {convoNull ? (
            <div className="flex justify-center my-20">
              <div onClick={startConvoHandler}>
                <Button>Click to start conversation</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="chat chat-start">
                {!admin && (
                  <div className="chat-bubble">How can I help you?</div>
                )}
              </div>
              {messages.map((m) => (
                <div key={m.id}>
                  <MessageText
                    convo={admin ? selected_convo : convo[0]}
                    message={m}
                    admin={admin}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {!convoNull && (
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
      )}
    </div>
  );
};

export default Message;
