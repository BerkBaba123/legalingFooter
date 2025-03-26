import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ type, label }) => {
  let color = "primary";

  switch (type) {
    case "secondary":
      color = "secondary";
      break;
    case "tertiary":
      color = "inherit";
      break;
    default:
      color = "primary";
  }

  return <Button variant="contained" color={color}>{label}</Button>;
};

export default CustomButton;
