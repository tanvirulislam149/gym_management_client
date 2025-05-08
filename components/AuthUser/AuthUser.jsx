"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AuthUser = ({ children }) => {
  const { user, loading } = useSelector((state) => state?.user);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      console.log("object");
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <p className="text-2xl text-center h-screen mt-20">
        You don't have permission to see this page
      </p>
    );
  }

  return <div>{children}</div>;
};

export default AuthUser;
