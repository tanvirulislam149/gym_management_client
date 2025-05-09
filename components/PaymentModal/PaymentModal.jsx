import api_client from "@/api_client";
import axios from "axios";
import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

const PaymentModal = ({ booked_plan }) => {
  const { register, handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);

  const timeZone = "Asia/Dhaka";

  const onSubmit = (data) => {
    setLoading(true);
    const date_time = format(data.date_time, "yyyy-MM-dd", {
      timeZone,
    });
    const finalData = {
      booked_plans: booked_plan[0].id,
      start_date: date_time,
      status: "Not Paid",
    };

    api_client
      .post(`/payment/`, finalData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          api_client
            .post("/makePayment/initiate/", {
              amount: res.data.amount,
              payment_id: res.data.id,
            })
            .then((res) => {
              if (res.data.payment_url) {
                setLoading(false);
                window.location.href = res.data.payment_url;
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <dialog id="payment_modal" className="modal">
      <div className="modal-box h-90 bg-white text-black">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex justify-center">
          <form className="w-full p-3" onSubmit={handleSubmit(onSubmit)}>
            <label className="font-bold text-sm">Start Date:</label>
            <br />
            <Controller
              name="date_time"
              control={control}
              defaultValue={new Date()}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  wrapperClassName="w-full"
                  className="w-full px-3 py-2 border border-black rounded"
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select date and time"
                />
              )}
            />
            <br />
            <button className="btn btn-primary text-black mt-3" type="submit">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default PaymentModal;
