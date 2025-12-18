"use client";
import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import Link from "next/link";
import Button from "../Button/Button";
import msg from "../../images/msg.png";
import Image from "next/image";

const MessageCont = () => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
    setTimeout(() => {
      setShow(false);
    }, 6000);
  }, []);

  return (
    <div className="relative font-bold">
      {show && (
        <div className="chat chat-end absolute -top-14 -left-55">
          <div className="chat-bubble text-black bg-white">
            How can I help you, Sir?
          </div>
        </div>
      )}
      <div className="dropdown dropdown-left dropdown-end">
        <div tabIndex={0} role="button" className="m-1">
          <Image
            className="md:w-18 w-14 bg-white rounded-full"
            src={msg}
            alt="Picture of the author"
          />
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu p-0 rounded-xl text-black bg-black rounded-box z-1 sm:w-[400px] w-[300px] shadow-sm"
        >
          {user ? (
            <Message receiver={1} admin={false} />
          ) : (
            <>
              <div className="flex h-96 justify-center w-full  items-center">
                <div className="">
                  <p className="text-3xl text-white">Please login</p>
                  <p className="text-white">To chat with Admin</p>
                  <Link href={"/login"}>
                    <Button>Member Login</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCont;
