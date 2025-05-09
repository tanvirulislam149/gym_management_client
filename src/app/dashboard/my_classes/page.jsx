"use client";
import api_client from "@/api_client";
import React, { useEffect, useState } from "react";
import AuthUser from "../../../../components/AuthUser/AuthUser";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { format, parseISO } from "date-fns";

const My_classes = () => {
  const [classes, setClasses] = useState([]);
  console.log(classes);

  useEffect(() => {
    api_client
      .get("https://gym-management-henna.vercel.app/attendence/")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AuthUser>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-8">My Classes</p>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Class Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Instructor</th>
                <th>Attendence</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, index) => (
                <tr key={c.id}>
                  <th>{index + 1}</th>
                  <td>{c.user.email}</td>
                  <td>{c.scheduled_class.fitness_class.name}</td>
                  <td>
                    {format(
                      parseISO(c.scheduled_class.date_time),
                      "MMMM dd, yyyy"
                    )}
                  </td>
                  <td>
                    {format(parseISO(c.scheduled_class.date_time), "hh:mm aa")}
                  </td>
                  <td>{c.scheduled_class.instructor}</td>
                  <td>
                    {c.attendence == "Present" ? (
                      <span className="bg-green-400 text-black px-3 py-2 rounded-full font-bold">
                        Present
                      </span>
                    ) : (
                      <span className="bg-red-400 text-black px-3 py-2 rounded-full font-bold">
                        Absent
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardLayout>
    </AuthUser>
  );
};

export default My_classes;
