import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const PageLocker = ({
  children,
  pass,
  hint,
  label,
  confirmLabel,
  mistakeMax,
  hideMistakeCounter,
}) => {
  const [input, setInput] = React.useState("");
  const [isLocked, setLock] = React.useState(true);
  const [mistakeCount, setMistakeCount] = React.useState(0);

  const isChildrenEmpty = () => {
    return Boolean(children === undefined || children === null);
  };

  const isMistakeOverLimit = () => {
    return Boolean(!isNaN(mistakeMax) && mistakeCount >= mistakeMax);
  };

  const checkPass = () => {
    const unlock = Boolean(input === pass);
    setLock(!unlock);

    if (!unlock) {
      setMistakeCount(mistakeCount + 1);
      console.log(mistakeCount);
    }
  };

  if (isLocked || isChildrenEmpty()) {
    if (isChildrenEmpty()) {
      console.error(
        `The element Prop.children from PageLocker is not defined and should be`
      );
    }
    console.log(Array(mistakeMax));
    return (
      <div className="locker">
        <h3>{label}</h3>
        <input
          type="text"
          placeholder={hint}
          onChange={(e) => setInput(e.target.value)}
        />

        {!hideMistakeCounter && (
          <div className="mistake-counter">
            {[...Array(mistakeMax - mistakeCount)].map((e, index) => (
              <div className="life" key={index}>
                0
              </div>
            ))}
          </div>
        )}

        <button onClick={(e) => checkPass()}>{confirmLabel}</button>
      </div>
    );
  } else {
    return children;
  }
};

PageLocker.defaultProps = {
  label: "LOCKED",
  hideMistakeCounter: false,
  confirmLabel: "OK",
};

PageLocker.propTypes = {
  pass: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  confirmLabel: PropTypes.string,
  mistakeMax: PropTypes.number,
  hideMistakeCounter: PropTypes.bool,
};
