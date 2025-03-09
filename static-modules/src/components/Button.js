import React from "react";
import styles from "./Button.module.css"
import clsx from 'clsx';

const Button = ({ type, label }) => {
  let className = " btn ";

  switch (type) {
    case "primary":
      className += "btn-primary";
      break;
    case "secondary":
      className += "btn-secondary";
      break;
    case "tertiary":
      className += "btn-outline-dark";
      break;
    default:
      className += "btn-light";
  }

  return <button className={clsx(className, styles.lgbutton, {
        [styles.primary]: type === "primary"
    })}>{label}</button>;
};

export default Button;
