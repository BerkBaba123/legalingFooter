import React from "react";
import { Modal, Box, Typography, IconButton, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

const DataFetchingModal = ({ isOpen, handleClose }) => {
  const theme = useTheme();

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "411px",
          height: "300px",
          bgcolor: theme.palette.mode === 'light' ? theme.palette.background.paper : '#1E1E1E',
          boxShadow: 24,
          p: "20px",
          borderRadius: "30px",
          color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        {/* Kapat Butonu */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff'
          }}
        >
          <Close />
        </IconButton>

        {/* İçerik */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Bu Modal bilgilerini database'den çekecektir.
        </Typography>
      </Box>
    </Modal>
  );
};

export default DataFetchingModal;
