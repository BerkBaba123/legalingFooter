import React from "react";
import { TextField, useTheme, MenuItem, Select, useMediaQuery } from "@mui/material";
import Cleave from "cleave.js/react";
import "./InputField.css";

const InputField = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  isPhoneNumber = false,
  type = "text",
  multiline = false,
  rows = 1,
  select = false,
  children,
  required = false,
  fullWidth = true,
  error = false,
  helperText = "",
  className = "",
  options = [],
  size = "default",
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getInputSize = () => {
    if (size === "small") return "small-input";
    if (size === "large") return "large-input";
    return "";
  };

  const inputClassName = `input-field ${getInputSize()} ${className} ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`;

  if (isPhoneNumber) {
    return (
      <div className={`input-container ${getInputSize()} ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`}>
        <Cleave
          options={{
            numericOnly: true,
            delimiters: ["(", ") ", " ", " "],
            blocks: [1, 3, 3, 2, 2],
            prefix: "0",
            noImmediatePrefix: true,
          }}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "0(5xx) xxx xx xx"}
          className={`cleave-input ${getInputSize()}`}
          {...props}
        />
      </div>
    );
  }

  if (select) {
    return (
      <div className={`input-container ${getInputSize()} ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          className={inputClassName}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: isMobile ? '40vh' : '50vh',
                width: isMobile ? 'calc(100% - 32px)' : undefined
              }
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  return (
    <div className={`input-container ${getInputSize()} ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`}>
      <TextField
        label={label}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        multiline={multiline}
        rows={rows}
        required={required}
        fullWidth={fullWidth}
        error={error}
        helperText={helperText}
        className={inputClassName}
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        {...props}
      >
        {children}
      </TextField>
    </div>
  );
};

export default InputField;
