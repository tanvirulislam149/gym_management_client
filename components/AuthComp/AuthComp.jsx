"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AuthComp = ({ children }) => {
  const { user, loading } = useSelector((state) => state?.user);
  const router = useRouter();

  useEffect(() => {
    if (!user?.is_staff && !loading) {
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

  if (user?.is_staff) return <div>{children}</div>;
};

export default AuthComp;
