"use client";
import React from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import AuthUser from "../../../../components/AuthUser/AuthUser";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <AuthUser>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-8">My Profile</p>
        <div className="bg-base-200 p-5 rounded-lg flex items-center mb-2">
          <div>
            <img
              className="rounded-full md:w-35 md:h-35 w-25 h-25"
              alt="Tailwind CSS Navbar component"
              src={
                user?.image
                  ? user?.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
          </div>
          <div className="md:ml-10 ml-5">
            <p className="font-bold text-3xl my-2">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="font-bold text-base my-1">{user?.email}</p>
            <p className="font-bold text-base my-1">
              {user?.is_staff ? "Admin" : "Member"}
            </p>
          </div>
        </div>
        <div className="bg-base-200 p-5 rounded-lg ">
          <p className="text-2xl font-bold">Personal Information</p>
          <div className="bg-base-200 p-5 rounded-lg grid grid-cols-2 gap-5">
            <div>
              <p className="font-bold opacity-60">First Name</p>
              <p className="font-bold text-xl">
                {user?.first_name ? user?.first_name : "N/A"}
              </p>
            </div>
            <div>
              <p className="font-bold opacity-60">Last Name</p>
              <p className="font-bold text-xl">
                {user?.last_name ? user?.last_name : "N/A"}
              </p>
            </div>
            <div>
              <p className="font-bold opacity-60">Phone</p>
              <p className="font-bold text-xl">
                {user?.phone_number ? user?.phone_number : "N/A"}
              </p>
            </div>
            <div>
              <p className="font-bold opacity-60">Address</p>
              <p className="font-bold text-xl">
                {user?.address ? user?.address : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthUser>
  );
};

export default page;
