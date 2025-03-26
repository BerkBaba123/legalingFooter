import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Chip,
  Menu,
  MenuItem,
  Divider
} from "@mui/material";
import { DarkMode, LightMode, School, Menu as MenuIcon, History, AccountCircle, KeyboardArrowUp, ExitToApp } from "@mui/icons-material";
import SchoolIcon from '@mui/icons-material/School';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ModalManager from "./ModalManager";
import styles from "./Button.module.css";
import "./Header.css";
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const { user, logout, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    message: '',
    profession: ''
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType(null);
    setFormData({
      name: '',
      surname: '',
      email: '',
      password: '',
      message: '',
      profession: ''
    });
    setPhoneNumber('');
    setSelectedDate(null);
    setSelectedPlan(null);
    setUpgradeModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalType === 'login') {
        // Giriş işlemi
        await login(formData.email, formData.password);
        
        // Başarılı giriş sonrası
        handleCloseModal();
        
        // Eğer localStorage'da bekleyen bir plan varsa, plan yükseltme modalını aç
        const savedPlan = localStorage.getItem('selectedPlan');
        if (savedPlan) {
          const plan = JSON.parse(savedPlan);
          setSelectedPlan(plan);
          setTimeout(() => {
            setUpgradeModalOpen(true);
            localStorage.removeItem('selectedPlan');
          }, 500);
        }
      } else if (modalType === 'signup') {
        // Kayıt işlemi
        // ... signup logic ...
        handleCloseModal();
      } else if (modalType === 'contact') {
        // İletişim formu
        // ... contact form logic ...
        handleCloseModal();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Hata durumunda alert göster
      alert(error.message || 'Bir hata oluştu');
    }
  };

  const menuItems = [
    { text: 'Fiyatlandırma', link: '/suggest' },
    { text: 'Hakkımızda', link: '/about' },
    { text: 'SSS', link: '/faq' },
    { text: 'Bize Yazın', onClick: () => handleOpenModal('contact') }
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '280px', sm: '320px' },
          backgroundColor: theme.palette.mode === 'light' ? '#E2E3E5' : '#080808',
          borderLeft: '1px solid #5D5D5D'
        }
      }}
    >
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            component={item.link ? RouterLink : 'button'}
            to={item.link}
            onClick={item.onClick || (() => setMobileMenuOpen(false))}
            sx={{
              color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              '&:hover': { color: '#FFC300' },
              textTransform: 'none',
              padding: '12px 24px',
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 700
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem sx={{ 
          flexDirection: 'column', 
          alignItems: 'stretch', 
          gap: 1, 
          pt: 2,
          px: { xs: 2, sm: 3 }
        }}>
          <Button 
            onClick={() => handleOpenModal('login')}
            fullWidth
            sx={{ 
              color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              '&:hover': { color: '#FFC300' },
              textTransform: 'none',
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 700
            }}
          >
            Giriş Yap
          </Button>
          <Button 
            onClick={() => handleOpenModal('signup')}
            variant="contained"
            fullWidth
            sx={{ 
              bgcolor: '#FFC300',
              color: '#000000',
              '&:hover': { bgcolor: '#e6b000' },
              textTransform: 'none',
              width: '117px',
              height: '47px',
              padding: '15px 30px',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '17px',
              letterSpacing: '0.5px',
              whiteSpace: 'nowrap'
            }}
          >
            Kayıt Ol
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: theme.palette.mode === 'light' ? '#E2E3E5' : '#080808',
          boxShadow: 'none',
          borderBottom: '1px solid #5D5D5D',
          width: '100%',
          height: { xs: '60px', sm: '67px' },
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <Toolbar sx={{ 
          height: '100%', 
          minHeight: { xs: '60px !important', sm: '67px !important' },
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          padding: {
            xs: '0 12px',
            sm: '0 16px',
            md: '0 20px'
          },
          justifyContent: 'flex-start'
        }}>
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              maxWidth: { xs: '120px', sm: '140px', md: 'none' }
            }}
          >
            <img 
              src="/assets/Legaling-Logo-Design-White-Background.png" 
              alt="Legaling Logo" 
              style={{ 
                height: 'auto',
                width: '100%',
                maxHeight: '40px'
              }}
            />
          </Box>

          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              gap: { sm: 1, md: 1.5 }, 
              marginLeft: '12px',
              fontSize: { sm: '14px', md: '16px' }
            }}>
              {menuItems.map((item) => (
                item.link ? (
                  <Button 
                    key={item.text}
                    component={RouterLink}
                    to={item.link}
                    color="inherit"
                    sx={{ 
                      color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                      '&:hover': { color: '#FFC300' },
                      textTransform: 'none',
                      padding: { sm: '6px 8px', md: '6px 12px' },
                      fontSize: 'inherit',
                      fontWeight: 700
                    }}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Button 
                    key={item.text}
                    onClick={item.onClick}
                    color="inherit"
                    sx={{ 
                      color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                      '&:hover': { color: '#FFC300' },
                      textTransform: 'none',
                      padding: { sm: '6px 8px', md: '6px 12px' },
                      fontSize: 'inherit',
                      fontWeight: 700
                    }}
                  >
                    {item.text}
                  </Button>
                )
              ))}
            </Box>
          )}

          <Box sx={{ 
            marginLeft: 'auto', 
            display: 'flex', 
            alignItems: 'center',
            gap: { xs: 1, sm: 1.5 }
          }}>
            {user ? null : (
              !isMobile && (
                <>
                  <Button
                    onClick={() => handleOpenModal('login')}
                    color="inherit"
                    sx={{
                      color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                      '&:hover': { color: '#FFC300' },
                      textTransform: 'none',
                      fontSize: { sm: '14px', md: '16px' },
                      padding: { sm: '6px 8px', md: '6px 12px' },
                      fontWeight: 700
                    }}
                  >
                    Giriş Yap
                  </Button>
                  <Button 
                    onClick={() => handleOpenModal('signup')}
                    variant="contained"
                    sx={{ 
                      bgcolor: '#FFC300',
                      color: '#000000',
                      '&:hover': { bgcolor: '#e6b000' },
                      textTransform: 'none',
                      width: '117px',
                      height: '47px',
                      padding: '15px 30px',
                      borderRadius: '5px',
                      fontSize: '16px',
                      fontWeight: 700,
                      lineHeight: '17px',
                      letterSpacing: '0.5px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Kayıt Ol
                  </Button>
                </>
              )
            )}
            <IconButton
              sx={{
                width: { xs: '36px', sm: '40px' },
                height: { xs: '36px', sm: '40px' },
                border: theme => `2px solid ${theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808'}`,
                borderRadius: '50%',
                padding: { xs: '6px', sm: '8px' },
                color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#FFC300',
                  borderColor: '#FFC300'
                }
              }}
            >
              <SchoolIcon sx={{ width: { xs: 18, sm: 20 }, height: { xs: 18, sm: 20 } }} />
            </IconButton>
            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                  padding: '8px',
                  marginLeft: { xs: 0.5, sm: 1 }
                }}
              >
                <MenuIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu()}

      <ModalManager
        open={modalOpen}
        modalType={modalType}
        onClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        phoneNumber={phoneNumber}
        handlePhoneChange={handlePhoneChange}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleOpenModal={handleOpenModal}
        selectedPlan={selectedPlan}
        upgradeModalOpen={upgradeModalOpen}
        setUpgradeModalOpen={setUpgradeModalOpen}
      />
    </>
  );
};

export default Header;