"use client";
import React, { useEffect, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import api_client from "@/api_client";
import Message from "../../../../components/Message/Message";

const page = () => {
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState(0);
  console.log(conversations);

  useEffect(() => {
    api_client
      .get("http://127.0.0.1:8000/get_conversations/")
      .then((res) => setConversations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AuthComp>
      <DashboardLayout>
        <div className="flex justify-between">
          <div>
            <h1>Conversations</h1>
            {conversations.map((c) => (
              <>
                <button
                  onClick={() => setReceiver(c.id)}
                  className="px-5 py-2 my-2 border cursor-pointer"
                >
                  {c.email}
                </button>
                <br />
              </>
            ))}
          </div>
          <div>
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
