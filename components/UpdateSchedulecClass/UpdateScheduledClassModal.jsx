import api_client from "@/api_client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import { format } from "date-fns-tz";

const UpdateScheduledClassModal = ({ fetchClasses, classes, updateId }) => {
  const { register, handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const timeZone = "Asia/Dhaka";

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/scheduled_classes/${updateId}/`)
      .then((res) => {
        reset({
          date_time: res.data.date_time,
          fitness_class: res.data.fitness_class.id,
          instructor: res.data.instructor,
          total_seats: res.data.total_seats,
        });
      })
      .catch((err) => console.log(err));
  }, [updateId]);

  const onSubmit = (data) => {
    setLoading(true);
    const date_time = format(data.date_time, "yyyy-MM-dd'T'HH:mm:ssXXX", {
      timeZone,
    });
    const finalData = {
      ...data,
      fitness_class: parseInt(data.fitness_class),
      date_time: date_time,
      total_seats: parseInt(data.total_seats),
    };

    api_client
      .put(`http://127.0.0.1:8000/scheduled_classes/${updateId}/`, finalData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          fetchClasses();
          setLoading(false);
          document.getElementById("my_modal_3").showModal();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <dialog id="updateScheduledClassModal" className="modal">
      <div className="modal-box bg-white text-black">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex justify-center">
          <form className="w-full p-3" onSubmit={handleSubmit(onSubmit)}>
            <label className="font-bold text-sm">Date and Time:</label>
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
                  showTimeSelect
                  timeFormat="hh:mm aa"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd hh:mm aa"
                  placeholderText="Select date and time"
                />
              )}
            />
            <label className="font-bold text-sm">Fitness Class:</label>
            <select
              defaultValue="Pick a class"
              {...register("fitness_class", { required: true })}
              className="select bg-transparent border border-black w-full"
            >
              <option disabled={true}>Pick a class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <label className="font-bold text-sm">Instructor:</label>
            <input
              type="text"
              className="input w-full bg-transparent border border-black"
              placeholder="Type here"
              {...register("instructor", { required: true })}
            />
            <label className="font-bold text-sm">Total Seats:</label>
            <input
              type="number"
              className="input w-full bg-transparent border border-black"
              placeholder="Type here"
              {...register("total_seats", { required: true })}
            />
            <br />
            <button className="btn btn-primary text-black mt-3" type="submit">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Modal text={"Class updated."} />
    </dialog>
  );
};

export default UpdateScheduledClassModal;
