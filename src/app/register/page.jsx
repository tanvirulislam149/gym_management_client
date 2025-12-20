"use client";
import React, { useEffect, useState } from "react";
import styles from "./register.module.css";
import Button from "../../../components/Button/Button";
import { useDispatch } from "react-redux";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/Redux/services/userApi";
import { useRouter } from "next/navigation";
import Modal from "../../../components/Modal/Modal";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { getUser } from "@/Redux/features/userSlice";

const register = () => {
  const [email, setEmail] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [registerUser, { isSuccess, isError, error }] =
    useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  useEffect(() => {
    if (isError) {
      if (Object.keys(error?.data)[0] === "password") {
        setErrorMsg(`${Object.values(error?.data)[0]}\n
        Password should be at least 8 character, must include letters and numbers, Not too similar to your username, email, or other attributes, Not a common password.
          `);
      } else {
        setErrorMsg(`${Object.values(error?.data)[0]}`);
      }
      document.getElementById(`my_modal_3`).showModal();
    }
  }, [isError, isSuccess]);

  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      const formData = new FormData();
      image && formData.append("image", image);
      formData.append("email", email);
      formData.append("first_name", f_name);
      formData.append("last_name", l_name);
      formData.append("address", address);
      formData.append("phone_number", number);
      formData.append("password", password);
      const result = await registerUser(formData);
      if (result?.error) {
        setLoading(false);
        return;
      }
      // after registering, going for user login
      const loginResult = await loginUser({ email, password });
      if (!loginResult?.data?.access) {
        setLoading(false);
        return;
      }
      localStorage.setItem("token", loginResult?.data?.access);
      axios
        .get("https://gym-management-henna.vercel.app/auth/users/me/", {
          headers: {
            Authorization: `JWT ${loginResult?.data?.access}`,
          },
        })
        .then((res) => {
          dispatch(getUser(res.data));
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    } else {
      setErrorMsg(`Password didn't matched`);
      document.getElementById(`my_modal_3`).showModal();
    }
  };
  return (
    <div>
      <div className={`${styles.container} flex justify-center items-center`}>
        <div
          className={`${styles.inputCont} w-full m-2 lg:w-3/6 flex justify-center`}
        >
          <form
            onSubmit={(e) => handleRegister(e)}
            className="w-full p-3 lg:w-3/4 mb-5"
          >
            <p className="text-3xl my-5 mb-5 text-center">Register</p>
            <label htmlFor="email">Email: </label>
            <br />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="input bg-white mt-1 mb-3 w-full text-black"
            />
            <label htmlFor="email">First Name: </label>
            <br />
            <input
              type="text"
              name="f_name"
              placeholder="Enter your first name"
              onChange={(e) => setF_name(e.target.value)}
              className="input bg-white mt-1 mb-3 w-full text-black"
            />
            <label htmlFor="email">Last Name: </label>
            <br />
            <input
              type="text"
              name="l_name"
              placeholder="Enter your last name"
              onChange={(e) => setL_name(e.target.value)}
              className="input bg-white mt-1 mb-3 w-full text-black"
            />
            <label htmlFor="email">Image: </label>
            <br />
            <input
              type="file"
              name="image"
              className="file-input w-full bg-white text-black"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="email">Address: </label>
            <br />
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
              className="input bg-white mt-1 mb-3 w-full text-black"
            />
            <label htmlFor="email">Phone number: </label>
            <br />
            <input
              type="number"
              name="number"
              placeholder="Enter your number"
              onChange={(e) => setNumber(e.target.value)}
              className="input bg-white mt-1 mb-3 w-full text-black"
            />
            <label htmlFor="password">Password</label>
            <br />
            <div className="flex justify-center items-center relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                className="input bg-white mt-1 mb-3 w-full text-black"
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPass ? (
                <FaRegEyeSlash
                  onClick={() => setShowPass(false)}
                  className="w-6 h-6 absolute top-2.5 right-2.5 z-10"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShowPass(true)}
                  className="w-6 h-6 absolute top-2.5 right-2.5 z-10"
                />
              )}
            </div>
            <label htmlFor="password">Confirm Password</label>
            <br />
            <div className="flex justify-center items-center relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm your password"
                className="input bg-white mt-1 w-full text-black"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showConfirmPass ? (
                <FaRegEyeSlash
                  onClick={() => setShowConfirmPass(false)}
                  className="w-6 h-6 absolute top-2.5 right-2.5 z-10"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShowConfirmPass(true)}
                  className="w-6 h-6 absolute top-2.5 right-2.5 z-10"
                />
              )}
            </div>
            <Button>
              <input
                type="submit"
                className="text-base"
                disabled={loading ? true : ""}
                value={`${loading ? "Processing..." : "Register"}`}
              />
            </Button>
          </form>
        </div>
      </div>
      <Modal text={errorMsg} />
    </div>
  );
};

export default register;
