import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

function Modal({ closeModal }) {


  return createPortal(
    <>
      <div className={classes.modalBackground}>
        <div className={classes.modalContainer}>
          <div className={classes.titleCloseBtn}>
            <button onClick={() => closeModal(false)}> X </button>
          </div>
          <div className={classes.title}></div>
          <div className={classes.body}> Here the time details </div>
          <div className={classes.footer}>
        
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
