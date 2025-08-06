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
      <div className="dropdown dropdown-left dropdown-end dropdown-open">
        <div tabIndex={0} role="button" className="m-1">
          <Image
            className="w-20 bg-white rounded-full"
            src={msg}
            alt="Picture of the author"
          />
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu p-0 rounded-2xl text-black bg-white rounded-box z-1 w-[400px] h-[500px] overflow-auto shadow-sm"
        >
          {user ? (
            <Message receiver={1} admin={false} />
          ) : (
            <>
              <div className="flex justify-center w-full h-full items-center">
                <div>
                  <p>Please login</p>
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
