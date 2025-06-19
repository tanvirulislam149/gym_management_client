"use client";
import api_client from "@/api_client";
import { format, parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const socketRef = useRef(null);
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newNotification, setNewNotification] = useState(0);

  const fetch_notification = () => {
    setLoading(true);
    api_client
      .get("https://gym-management-0fmi.onrender.com/notification/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch_notification();
  }, []);

  useEffect(() => {
    const newData = data.filter((d) => d.is_read == false);
    if (newData.length) {
      setNewNotification(newData.length);
    }
  }, [data.length]);

  useEffect(() => {
    if (user) {
      socketRef.current = new WebSocket(
        `wss://gym-management-0fmi.onrender.com/ws/notifications/${user.id}/`
      );
      socketRef.current.onmessage = (e) => {
        const newData = JSON.parse(e.data);
        console.log(newData);
        setData((prev) => [newData, ...prev]);
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [user]);

  const handleReadNotification = () => {
    if (newNotification) {
      api_client
        .post(
          "https://gym-management-0fmi.onrender.com/notification/read_notification/"
        )
        .then((res) => {
          setNewNotification(0);
          fetch_notification();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div
        onClick={() => handleReadNotification()}
        className="dropdown dropdown-end"
      >
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
              <span className=" text-white font-normal indicator-item">
                {newNotification !== 0 && newNotification}
              </span>
            </div>
          </button>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white rounded-box text-black z-1 w-96 max-h-96 overflow-y-scroll p-2 shadow-sm"
        >
          <div>
            {data?.length ? (
              data.map((d, index) => (
                <li key={index} className="">
                  <p
                    className={`text-base border-b-1 cursor-auto ${
                      d.is_read ? "" : "bg-gray-200"
                    } my-0.5`}
                  >
                    {d.message.message_text.split("at ")[0]}
                    {d.message.message_text.split("at ")[1]
                      ? ` at ${format(
                          parseISO(
                            d.message.message_text
                              .split("at ")[1]
                              ?.split(" class")[0]
                          ),
                          "hh:mm aa, MMMM dd, yyyy"
                        )}`
                      : ""}
                  </p>
                </li>
              ))
            ) : (
              <p>No notification found</p>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Notification;
