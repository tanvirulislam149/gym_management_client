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
        <div className="flex justify-between">
          <div className="md:w-1/2">
            <h1>Conversations</h1>
            {conversations.map((c) =>
              c.id == 1 ? (
                ""
              ) : (
                <>
                  <div key={c.id}>
                    <button
                      onClick={() => handleMarkRead(c.id)}
                      className={`px-5 py-2 my-2 border cursor-pointer ${
                        c.has_unread ? "font-bold" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
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
                    <br />
                  </div>
                </>
              )
            )}
          </div>
          <div className="md:w-1/2">
            {receiver != 0 ? (
              <Message
                receiver={receiver}
                admin={true}
                handleMarkRead={handleMarkRead}
              />
            ) : (
              <p>Click on conversation</p>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthComp>
  );
};

export default page;
