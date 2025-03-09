import React from "react";

const Hyperlink = ({ url, label, icon }) => {
  return (
    <a href={url} className="text-decoration-none d-flex align-items-center gap-2" target="_blank" rel="noopener noreferrer">
      {icon && <i className={`fab fa-${icon} fa-lg`}></i>}
      {label}
    </a>
  );
};

export default Hyperlink;
