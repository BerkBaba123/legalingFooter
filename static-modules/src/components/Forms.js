import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, useTheme } from "@mui/material";
import dayjs from "dayjs";
import InputField from "./InputField";

const Forms = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    profession: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.rawValue);
  };

  return (
    <form style={{ width: "100%" }}>
      <InputField 
        label="Adınız"
        placeholder="Adınızı girin" 
        name="name" 
        value={formData.name} 
        onChange={handleChange}
        sx={{ 
          pb: 2,
          '& .MuiInputBase-root': {
            width: '371px',
            height: '42px',
            borderRadius: '10px',
            gap: '10px',
            padding: '12px 15px',
            '& input': {
              padding: 0
            }
          }
        }}
      />
      <InputField 
        label="Soyadınız"
        placeholder="Soyadınızı girin" 
        name="surname" 
        value={formData.surname} 
        onChange={handleChange}
        sx={{ 
          pb: 2,
          '& .MuiInputBase-root': {
            width: '371px',
            height: '42px',
            borderRadius: '10px',
            gap: '10px',
            padding: '12px 15px',
            '& input': {
              padding: 0
            }
          }
        }}
      />
      <InputField 
        label="Meslek"
        placeholder="Mesleğinizi seçin" 
        name="profession" 
        value={formData.profession} 
        onChange={handleChange}
        sx={{ 
          pb: 2,
          '& .MuiInputBase-root': {
            width: '371px',
            height: '42px',
            borderRadius: '10px',
            gap: '10px',
            padding: '12px 15px',
            '& input': {
              padding: 0
            }
          }
        }}
      />

      <InputField 
        label="Telefon"
        placeholder="0(5xx) xxx xx xx" 
        value={phoneNumber} 
        onChange={handlePhoneChange} 
        isPhoneNumber={true}
        sx={{ 
          pb: 2,
          '& .MuiInputBase-root': {
            width: '371px',
            height: '42px',
            borderRadius: '10px',
            gap: '10px',
            padding: '12px 15px',
            '& input': {
              padding: 0
            }
          }
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Doğum Tarihi"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          sx={{ 
            pb: 2,
            '& .MuiInputBase-root': {
              width: '371px',
              height: '42px',
              borderRadius: '10px',
              gap: '10px',
              padding: '12px 15px'
            }
          }}
          slotProps={{
            textField: { fullWidth: true },
            day: {
              sx: {
                "&.Mui-selected": {
                  backgroundColor: "#FFC300 !important",
                  color: "#000 !important",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#FFD700 !important",
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      <InputField 
        label="E-Posta"
        placeholder="E-Posta adresi girin" 
        name="email" 
        value={formData.email} 
        onChange={handleChange}
        sx={{ 
          pb: 2,
          '& .MuiInputBase-root': {
            width: '371px',
            height: '42px',
            borderRadius: '10px',
            gap: '10px',
            padding: '12px 15px',
            '& input': {
              padding: 0
            }
          }
        }}
      />

      <Button
        fullWidth
        sx={{
          mt: 1,
          width: '371px',
          height: '42px',
          bgcolor: "#FFC300",
          color: "#000",
          borderRadius: '10px',
          padding: '12px 15px',
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            bgcolor: "#FFD700"
          }
        }}
      >
        Üye Ol
      </Button>
    </form>
  );
};

export default Forms;
