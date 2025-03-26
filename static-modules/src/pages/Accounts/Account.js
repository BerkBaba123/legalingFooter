// src/pages/Account.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../App';

const Account = ({ handleOpenModal }) => {
  const { user, logout, loading } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [selectedTab, setSelectedTab] = useState('account-info');
  const { isDarkMode, toggleTheme } = useThemeContext();

  useEffect(() => {
    if (!loading && !user) {
      handleOpenModal('login');
      navigate('/');
    }
  }, [user, loading, handleOpenModal, navigate]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getMenuOptions = () => {
    switch (selectedTab) {
      case 'membership':
        return [
          'Üyelik Planı',
          'Fatura Bilgileri',
          'Kartlarımı Yönet',
          'Geçmiş Ödemeler'
        ];
      case 'leaderboard':
        return [];
      case 'account-info':
      default:
        return [
          'Kullanıcı Bilgileri',
          'Hesabı Yükselt',
          'Şifreyi Güncelle',
          'E-Posta Tercihleri',
          'Hesabı Sil'
        ];
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1060px', margin: '0 auto' }}>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '100%',
          letterSpacing: '0%',
          verticalAlign: 'middle',
          color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
          mb: 6
        }}
      >
        Hesabım
      </Typography>

      {/* Segmented Control */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
        <Box sx={{ width: '550px', height: '32px', display: 'flex' }}>
          <Typography
            onClick={() => setSelectedTab('account-info')}
            sx={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 500,
              color: selectedTab === 'account-info' ? '#FFC300' : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              cursor: 'pointer',
              borderBottom: selectedTab === 'account-info' ? '2px solid #FFC300' : 'none',
              paddingBottom: '8px',
              textAlign: 'center'
            }}
          >
            Hesap Bilgileri
          </Typography>
          <Typography
            onClick={() => setSelectedTab('membership')}
            sx={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 500,
              color: selectedTab === 'membership' ? '#FFC300' : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              cursor: 'pointer',
              borderBottom: selectedTab === 'membership' ? '2px solid #FFC300' : 'none',
              paddingBottom: '8px',
              textAlign: 'center'
            }}
          >
            Üyelik ve Ödeme
          </Typography>
          <Typography
            onClick={() => setSelectedTab('leaderboard')}
            sx={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 500,
              color: selectedTab === 'leaderboard' ? '#FFC300' : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              cursor: 'pointer',
              borderBottom: selectedTab === 'leaderboard' ? '2px solid #FFC300' : 'none',
              paddingBottom: '8px',
              textAlign: 'center'
            }}
          >
            Liderlik Tablosu
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '24px' }}>
        {/* Sol Kart */}
        <Box
          sx={{
            width: 337,
            height: 435,
            backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
            borderRadius: '30px',
            paddingTop: '10px',
            paddingRight: '30px',
            paddingBottom: '10px',
            paddingLeft: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: '277px',
              height: '100px',
              paddingTop: '20px',
              paddingBottom: '20px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              borderBottom: theme => `1px solid ${theme.palette.mode === 'light' ? '#E8E8E8' : '#5D5D5D'}`
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: theme => theme.palette.mode === 'light' ? '#F5F5F5' : '#2A2A2A'
              }}
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF'
                  }}
                >
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF'
                }}
              >
                {user?.name || 'Kullanıcı'} {user?.surname || 'Soyadı'}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme => theme.palette.mode === 'light' ? '#6B7280' : '#6B7280'
                }}
              >
                {user?.profession || 'Meslek'}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '142px',
              height: '315px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
          >
            {getMenuOptions().map((option, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  textDecoration: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationOffset: '0%',
                  textDecorationThickness: '0%',
                  color: option === 'Hesabı Yükselt'
                    ? '#FFC300'
                    : option === 'Hesabı Sil'
                    ? '#FF0000'
                    : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                  cursor: 'pointer',
                  '&:hover': {
                    color: option === 'Hesabı Yükselt'
                      ? '#FFC300'
                      : option === 'Hesabı Sil'
                      ? '#FF0000'
                      : '#FFC300'
                  }
                }}
              >
                {option}
              </Typography>
            ))}
          </Box>
        </Box>
        {/* Sağ Kart */}
        <Box
          sx={{
            width: '798px',
            height: '435px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '10px 30px',
            borderRadius: '30px',
            backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
            position: 'relative'
          }}
        >
          {/* Tema değiştirme butonu */}
          <Box sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Typography
              sx={{
                fontSize: '14px',
                color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                fontWeight: 500
              }}
            >
              Karanlık Mod
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#facc15",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#facc15",
                    },
                  }}
                />
              }
              label=""
              sx={{
                m: 0,
                '& .MuiFormControlLabel-label': {
                  display: 'none'
                }
              }}
            />
          </Box>

          {/* Sağ kartın içeriği buraya gelecek */}
        </Box>
      </Box>

      {/* Çıkış Yap butonu */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          mt: 3,
          ml: 3,
          padding: '5px 10px',
          '&:hover': {
            '& .logout-text': {
              color: '#FF4444'
            },
            '& .logout-icon': {
              color: '#FF4444'
            }
          }
        }}
        onClick={handleLogout}
      >
        <Typography
          className="logout-text"
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '100%',
            letterSpacing: '0%',
            verticalAlign: 'middle',
            color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
            transition: 'color 0.2s ease'
          }}
        >
          Çıkış Yap
        </Typography>
        <LogoutIcon
          className="logout-icon"
          sx={{
            fontSize: '24px',
            color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
            transition: 'color 0.2s ease'
          }}
        />
      </Box>
    </Box>
  );
};

export default Account;
