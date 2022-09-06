import React from "react";
import PropTypes from "prop-types";
import styles from "./locker.module.css";

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
  const mistakeLife = Math.max(mistakeMax, 0);

  const isChildrenEmpty = () => {
    return Boolean(children === undefined || children === null);
  };

  const isMistakeOverLimit = () => {
    return Boolean(mistakeCount >= mistakeMax && mistakeMax > 0);
  };

  const checkPass = () => {
    const unlock = Boolean(input === pass && !isMistakeOverLimit());
    setLock(!unlock);

    if (!unlock && !isMistakeOverLimit()) {
      setMistakeCount(mistakeCount + 1);
    }
  };

  if (isLocked || isChildrenEmpty()) {
    if (isChildrenEmpty()) {
      console.error(
        `The element Prop.children from PageLocker is not defined and should be`
      );
    }

    return (
      <div className={styles.locker}>
        <h3>{label}</h3>
        <input
          type="text"
          placeholder={hint}
          onChange={(e) => setInput(e.target.value)}
        />

        {!hideMistakeCounter && (
          <div className={styles.mistake_counter}>
            {[...Array(mistakeLife)].map((e, index) => {
              let isGone = index + 1 <= mistakeCount ? "hidden" : "visible";
              return (
                <div
                  className={styles.life}
                  key={index}
                  style={{ visibility: isGone }}
                />
              );
            })}
          </div>
        )}

        {!isMistakeOverLimit() && (
          <button onClick={(e) => checkPass()}>{confirmLabel}</button>
        )}
      </div>
    );
  } else {
    return children;
  }
};

PageLocker.defaultProps = {
  label: "LOCKED",
  mistakeMax: 0,
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
