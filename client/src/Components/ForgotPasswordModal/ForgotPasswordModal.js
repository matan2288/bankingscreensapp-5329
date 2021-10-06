import { React, useState } from "react";
import "../../Style/ForgotPasswordModalStyle/FPM.css";
import Modal from "react-modal";
import { ResetPW } from "./ResetPW.js";
import { ChangePW } from "./ChangePW.js";
Modal.setAppElement("#root");

export const ForgotPasswordModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [renderChangePW, setRenderChangePW] = useState(true);
  const [renderResetPW, setRenderResetPW] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <span onClick={openModal} id="forgot-pw">
        Forgot Password?
      </span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{ overlay: { background: "rgba(0,0,0,0.5)" } }}
        className="modal-mainstyle"
      >
        <div className="forgot-pw-cmpnt-holder">
          {renderChangePW ? (
            <ResetPW
              setRenderChangePW={setRenderChangePW}
              setRenderResetPW={setRenderResetPW}
              closeModal={closeModal}
            />
          ) : null}
          {renderResetPW ? (
            <ChangePW
              setRenderChangePW={setRenderChangePW}
              setRenderResetPW={setRenderResetPW}
              closeModal={closeModal}
            />
          ) : null}
        </div>
      </Modal>
    </div>
  );
};
