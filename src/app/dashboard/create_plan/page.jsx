import React from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";

const Create_plan = () => {
  return (
    <AuthComp>
      <DashboardLayout>
        <div className="w-full">
          <p className="text-5xl text-center text-green-400">Create Plan</p>
        </div>
      </DashboardLayout>
    </AuthComp>
  );
};

export default Create_plan;
