import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: 3
      }}
    >
      <Typography variant="h1" sx={{ mb: 2, color: '#FFC300', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sayfa Bulunamadı
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          backgroundColor: '#FFC300',
          color: '#000',
          '&:hover': {
            backgroundColor: '#FFD700'
          }
        }}
      >
        Ana Sayfaya Dön
      </Button>
    </Box>
  );
};

export default NotFound;
