"use client";
import React, { useEffect, useRef, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import api_client from "@/api_client";
import Message from "../../../../components/Message/Message";
import { useSelector } from "react-redux";

const page = () => {
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState(0);
  const user = useSelector((state) => state?.user?.user);
  console.log(conversations);

  const handleMarkRead = (id) => {
    console.log("mark read");
    setReceiver(id);
    const array = conversations.filter((c) => {
      if (c.id == id) {
        console.log(c.id, id);
        c.has_unread = false;
        return c;
      }
      return c;
    });
    setConversations(array);
  };

  useEffect(() => {
    api_client
      .get("http://127.0.0.1:8000/get_conversations/")
      .then((res) => {
        // Sort conversations: unread first
        const sorted = res.data.sort((a, b) => {
          if (a.has_unread === b.has_unread) return 0;
          return a.has_unread ? -1 : 1;
        });
        setConversations(sorted);
      })
      .catch((err) => console.log(err));
  }, []);

  const convoSocketRef = useRef(null);
  useEffect(() => {
    convoSocketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/conversations/${user?.id}/`
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
      setConversations((prev) => {
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
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center">
            {/* Page content here */}
            <div className="md:w-full px-3">
              {receiver != 0 ? (
                <Message
                  receiver={receiver}
                  admin={true}
                  handleMarkRead={handleMarkRead}
                />
              ) : (
                <div className="">
                  <p className="text-lg mt-20 text-center">
                    Click on conversation
                  </p>
                </div>
              )}
            </div>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Conversations
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <div className="">
                <h1 className="text-center text-xl underline">Conversations</h1>
                {conversations.map((c) =>
                  c.id == 1 ? (
                    ""
                  ) : (
                    <li
                      className="border-b-1 my-2 w-full mb-0 pb-0 cursor-pointer"
                      key={c.id}
                    >
                      <button
                        onClick={() => handleMarkRead(c.id)}
                        className={`w-full m-0 px-2 py-3 ${
                          c.has_unread ? "font-bold" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <img
                              className="w-9 h-9 rounded-full mr-2"
                              src={`${
                                c.image
                                  ? `${c.image}`
                                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                              }`}
                              alt=""
                            />
                          </div>
                          <div>{c.email}</div>
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
                  )
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
