import React from "react";

const Modal = ({ text }) => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-white text-black">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 style={{ whiteSpace: "pre-line" }} className="font-bold text-lg">
          {text}
        </h3>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
