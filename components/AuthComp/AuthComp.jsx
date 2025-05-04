"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AuthComp = ({ children }) => {
  const { user, loading } = useSelector((state) => state?.user);
  const router = useRouter();
  console.log(user, loading);

  useEffect(() => {
    if (!user?.is_staff && !loading) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user?.is_staff) {
    return (
      <p className="text-2xl text-center h-screen mt-20">
        You don't have to see this page
      </p>
    );
  }

  return <div>{children}</div>;
};

export default AuthComp;
