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

  useEffect(() => {
    api_client
      .get("http://127.0.0.1:8000/get_conversations/")
      .then((res) => setConversations(res.data))
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
      setConversations((prev) => [...prev, newData]);
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
            {conversations.map((c) => (
              <div key={c.id}>
                <button
                  onClick={() => setReceiver(c.id)}
                  className="px-5 py-2 my-2 border cursor-pointer"
                >
                  {c.email}
                </button>
                <br />
              </div>
            ))}
          </div>
          <div className="md:w-1/2">
            {receiver != 0 ? (
              <Message receiver={receiver} admin={true} />
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
