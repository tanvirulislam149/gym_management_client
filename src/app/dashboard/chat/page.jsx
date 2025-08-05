import React from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";

const page = () => {
  return (
    <AuthComp>
      <DashboardLayout>
        <div>
          <h1>This is chat page</h1>
        </div>
      </DashboardLayout>
    </AuthComp>
  );
};

export default page;
