import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Alerts = forwardRef((props, ref) => {
  const [alert, setAlert] = useState(null);
  const theme = useTheme();

  // Alert gösterme fonksiyonu
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // 3 saniye sonra kapat
  };

  // Dışarıdan erişim için fonksiyonları expose et
  useImperativeHandle(ref, () => ({
    showAlert
  }));

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={3000}
      onClose={() => setAlert(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999
      }}
    >
      {alert && (
        <Alert 
          severity={alert.type} 
          onClose={() => setAlert(null)}
          sx={{ 
            minWidth: '300px',
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.9)' 
              : 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            '& .MuiAlert-icon': {
              color: alert.type === 'success' 
                ? '#4CAF50' 
                : alert.type === 'error'
                ? '#f44336'
                : alert.type === 'warning'
                ? '#ff9800'
                : '#2196f3'
            }
          }}
        >
          {alert.message}
        </Alert>
      )}
    </Snackbar>
  );
});

export default Alerts;
