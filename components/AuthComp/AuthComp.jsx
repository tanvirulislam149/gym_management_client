"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AuthComp = ({ children }) => {
  const user = useSelector((state) => state?.user?.user);
  const router = useRouter();

  useEffect(() => {
    if (!user?.is_staff) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user?.is_staff) {
    return null;
  }

  return <div>{children}</div>;
};

export default AuthComp;
