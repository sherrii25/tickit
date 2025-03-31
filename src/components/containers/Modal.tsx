import React from "react";
import { useRouter } from "next/router";

interface ModalProps {
  closeModal: (value: boolean) => void;
}

function Modal({ closeModal }: ModalProps) {
  const router = useRouter();

  const redirect = (page: string) => {
    router.push(page);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button
          className="border__btn"
          id="closeBtn" 
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </button>
        <div>
          <div className="title"></div>
          <h3>Choose your ticket type:</h3>
          <div className="body">
            <button
              id="btn"
              className="border__btn"
              onClick={() => redirect("/parking")}
            >
              Parking Ticket
            </button>
            <button
              id="btn"
              className="border__btn"
              onClick={() => redirect("/traffic")}
            >
              Traffic Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
