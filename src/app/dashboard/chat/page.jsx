"use client";
import React, { useEffect, useRef, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import api_client from "@/api_client";
import Message from "../../../../components/Message/Message";
import { useSelector } from "react-redux";

const page = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected_convo, setSelected_convo] = useState([]);
  const user = useSelector((state) => state?.user?.user);

  const handleMarkRead = (selected_convo) => {
    setSelected_convo(selected_convo);
    const array = conversations.filter((c) => {
      if (c.id == selected_convo.id) {
        // console.log(c.id, id);
        c.has_unread = false;
        return c;
      }
      return c;
    });
    setConversations(array);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   api_client
  //     .get("https://gym-management-0fmi.onrender.com/get_conversations/")
  //     .then((res) => {
  //       // Sort conversations: unread first
  //       const sorted = res.data.sort((a, b) => {
  //         if (a.has_unread === b.has_unread) return 0;
  //         return a.has_unread ? -1 : 1;
  //       });
  //       setConversations(sorted);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, []);

  const get_convo = () => {
    api_client
      .get("http://127.0.0.1:8000/conversations/")
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    get_convo();
  }, []);
  console.log(conversations);

  const convoSocketRef = useRef(null); // websocket for showing new conversation
  useEffect(() => {
    // convoSocketRef.current = new WebSocket(
    //   `wss://gym-management-0fmi.onrender.com/ws/conversations/all_convo/`,
    // );
    convoSocketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/conversations/all_convo/`,
    );

    convoSocketRef.current.onopen = () => {
      console.log("WebSocket Connected");
    };
    convoSocketRef.current.onclose = () => {
      console.log("WebSocket Disconnected");
    };
    convoSocketRef.current.onmessage = (e) => {
      // receiving msg from BE
      const newData = JSON.parse(e.data);
      console.log(newData);
      setConversations((prev) => {   // preventing the repeatation of convo name
        const data = prev.filter((e) => e.id !== newData.id);
        return [newData, ...data];
      });
    };

    return () => {
      convoSocketRef.current.close();
    };
  }, [user]);

  return (
    <AuthComp>
      <DashboardLayout>
        {/* <div className="flex justify-between">


        </div> */}
        <div className="drawer lg:drawer-open">
          <input id="conversations" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <div className="">
              <label
                htmlFor="conversations"
                className="btn btn-primary m-2 drawer-button lg:hidden text-black"
              >
                Conversations
              </label>
            </div>
            <div className="w-full md:px-3">
              {selected_convo != 0 ? (
                <Message
                  selected_convo={selected_convo}
                  admin={true}
                  handleMarkRead={handleMarkRead}
                />
              ) : (
                <div className="">
                  <p className="text-xl my-20 text-center">
                    Click on conversation
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="conversations"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <div className="mt-20 md:mt-0">
                <h1 className="text-center text-xl underline">Conversations</h1>
                {loading ? (
                  <div className="flex justify-center">
                    <span className="loading loading-spinner mt-10 text-white loading-xl"></span>
                  </div>
                ) : (
                  conversations.map((c) => (
                    <li
                      className="border-b-1 my-2 w-full mb-0 pb-0 cursor-pointer"
                      key={c.id}
                    >
                      <button
                        onClick={() => handleMarkRead(c)}
                        className={`w-full m-0 px-2 py-3 ${
                          c.has_unread ? "font-bold" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <img
                              className="w-9 h-9 rounded-full mr-2"
                              src={`${
                                c.sender.image
                                  ? `${c.sender.image}`
                                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                              }`}
                              alt=""
                            />
                          </div>
                          <div>{c.sender.email}</div>
                          <div>
                            {c.has_unread ? (
                              <div className="w-3 h-3 bg-white rounded-full ml-3"></div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))
                )}
              </div>
            </ul>
          </div>
        </div>
      </DashboardLayout>
    </AuthComp>
  );
};

export default page;
