import React from "react";
import "./popup.css";


function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <button
          onClick={() => props.setTrigger(false)}
          className="close-button">
          Next Question
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
