"use client";
import React, { useEffect, useState } from "react";
import styles from "./register.module.css";
import Button from "../../../components/Button/Button";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "@/Redux/services/userApi";
import { useRouter } from "next/navigation";

const register = () => {
  const [email, setEmail] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");
  const router = useRouter();

  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setInterval(
        alert(
          `Registration Successfull. Please login. Redirecting to login...`
        ),
        3000
      );
      router.push("/login");
    }
    if (isError) {
      alert(`${Object.values(error?.data)[0]}`);
    }
  }, [isError, isSuccess]);

  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log({
      email,
      f_name,
      l_name,
      address,
      number,
      password,
      confirmPassword,
    });
    if (password === confirmPassword) {
      const result = await registerUser({
        email,
        first_name: f_name,
        last_name: l_name,
        address,
        phone_number: number,
        password,
      });
      console.log(result);
    } else {
      alert(`Password didn't matched`);
    }
  };
  return (
    <div>
      <div className={`${styles.container} flex justify-center items-center`}>
        <div
          className={`${styles.inputCont} w-full lg:w-3/6 flex justify-center`}
        >
          <form onSubmit={(e) => handleRegister(e)} className="w-3/4 mb-5">
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
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="input bg-white mt-1 mb-3 w-full text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm your password"
              className="input bg-white mt-1 w-full text-black"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button>
              <input
                type="submit"
                className="text-base"
                disabled={isLoading ? true : ""}
                value={`${isLoading ? "Processing..." : "Register"}`}
              />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
