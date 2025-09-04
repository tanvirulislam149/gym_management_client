"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AuthUser = ({ children }) => {
  const { user, loading } = useSelector((state) => state?.user);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, router]);

  if (loading) {
    return (
      <p className="text-2xl text-center h-screen mt-20">
        {/* You don't have permission to see this page */}
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );
  }

  if (user) return <div>{children}</div>;
};

export default AuthUser;
