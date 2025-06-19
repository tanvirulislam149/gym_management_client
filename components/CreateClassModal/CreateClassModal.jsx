import api_client from "@/api_client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import { format } from "date-fns-tz";
import ErrorModal from "../ErrorModal/ErrorModal";

const CreateClassModal = ({ fetchClasses, classes }) => {
  const { register, handleSubmit, control, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const timeZone = "Asia/Dhaka";

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
      .post(`/scheduled_classes/`, finalData)
      .then((res) => {
        if (res.status === 201) {
          reset();
          fetchClasses();
          setLoading(false);
          document.getElementById("createScheduledClass").showModal();
        }
      })
      .catch((err) => document.getElementById("errorModal").showModal());
  };

  return (
    <dialog id="CreateClassModal" className="modal">
      <div className="modal-box bg-white text-black">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <p className="text-2xl font-bold text-center">Create</p>
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
      <dialog id="createScheduledClass" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Class Scheduled.</h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <ErrorModal />
    </dialog>
  );
};

export default CreateClassModal;
