"use client";
import React from "react";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import Link from "next/link";
import Button from "../Button/Button";
import msg from "../../images/msg.png";
import Image from "next/image";

const MessageCont = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div>
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
          className="dropdown-content menu p-0 rounded-2xl text-black bg-white rounded-box z-1 sm:w-[400px] w-[300px] shadow-sm"
        >
          {user ? (
            <Message receiver={1} admin={false} />
          ) : (
            <>
              <div className="flex h-96 justify-center w-full items-center">
                <div className="">
                  <p className="text-3xl">Please login</p>
                  <p>To chat with Admin</p>
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
