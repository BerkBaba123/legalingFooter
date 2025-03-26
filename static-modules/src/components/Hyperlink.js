import React from "react";
import { Link } from "@mui/material";

const Hyperlink = ({ url, label }) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: "none", color: "inherit" }}>
      {label}
    </Link>
  );
};

export default Hyperlink;
