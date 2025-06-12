"use client";
import api_client from "@/api_client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const socketRef = useRef(null);
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api_client
      .get("http://127.0.0.1:8000/notification/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      socketRef.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/notifications/public_notification/`
      );
      socketRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
      };

      return () => socketRef.current.close();
    }
  }, [user]);
  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="sm:h-6 sm:w-6 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />{" "}
              </svg>
              <span className="status status-lg status-primary animate-bounce indicator-item"></span>
            </div>
          </button>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white rounded-box text-black z-1 w-52 p-2 shadow-sm"
        >
          {data?.length ? (
            data.map((d) => (
              <li key={d.id} className="w-52">
                {d.message.message_text}
              </li>
            ))
          ) : (
            <p>No notification found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
