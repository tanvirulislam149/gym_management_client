"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Modal from "../../../../../components/Modal/Modal";
import ErrorModal from "../../../../../components/ErrorModal/ErrorModal";

const passwordReset = () => {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const urlArray = pathname.split("/");

  const handleResetPass = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://gym-management-0fmi.onrender.com/auth/users/reset_password_confirm/",
        {
          uid: urlArray[2],
          token: urlArray[3],
          new_password: e.target.password.value,
        }
      )
      .then((res) => {
        if (res.status === 204) {
          setMsg("Password changed. Please login.");
          document.getElementById(`my_modal_3`).showModal();
        }
      })
      .catch((err) => document.getElementById("errorModal").showModal())
      .finally(() => setLoading(false));
  };
  return (
    <div className="h-screen">
      <p className="text-center font-bold my-5 text-2xl">Password reset</p>
      <form
        onSubmit={(e) => handleResetPass(e)}
        className="flex justify-center"
      >
        {/* <div className="w-full mx-auto"> */}
        <input
          type="text"
          name="password"
          id=""
          placeholder="Enter your password"
          className="input border border-white mr-3"
        />
        <br />
        <input
          type="submit"
          disabled={loading}
          value={loading ? "Submitting..." : "Submit"}
          className="btn btn-primary text-black"
        />
        {/* </div> */}
      </form>
      <Modal text={msg} />
      <ErrorModal />
    </div>
  );
};

export default passwordReset;
