import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, useTheme, Button, Checkbox, FormControlLabel, Select, MenuItem, FormHelperText, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputField from './InputField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './Button.module.css';
import PlanUpgradeModal from './PlanUpgradeModal';
import { useAuth } from '../context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const datePickerTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--background-color) !important'
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#FFC300 !important',
            color: '#000000 !important',
            '&:hover': {
              backgroundColor: '#e6b000 !important'
            }
          }
        }
      }
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--background-color) !important',
          color: 'var(--text-color)',
          '& .MuiPickersCalendarHeader-root': {
            color: 'var(--text-color)'
          },
          '& .MuiDayCalendar-weekDayLabel': {
            color: 'var(--text-color)'
          },
          '& .MuiPickersDay-root:not(.Mui-selected)': {
            color: 'var(--text-color)'
          },
          '& .MuiPickersArrowSwitcher-button': {
            color: 'var(--text-color)'
          }
        }
      }
    },
    MuiYearCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--background-color) !important',
          '& .MuiPickersYear-yearButton': {
            color: 'var(--text-color)',
            '&.Mui-selected': {
              backgroundColor: '#FFC300 !important',
              color: '#000000 !important',
              '&:hover': {
                backgroundColor: '#e6b000 !important'
              }
            }
          }
        }
      }
    }
  }
});

const ModalManager = ({
  open,
  modalType,
  onClose,
  handleSubmit,
  formData,
  setFormData,
  phoneNumber,
  handlePhoneChange,
  selectedDate,
  setSelectedDate,
  handleOpenModal,
  selectedPlan,
  upgradeModalOpen,
  setUpgradeModalOpen
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [profession, setProfession] = useState('');
  const { user } = useAuth();

  const professions = [
    'Avukat',
    'Stajyer Avukat',
    'Öğretim Üyesi/Öğretmen',
    'Öğrenci',
    'Çevirmen/Tercüman',
    'Patent Marka Vekili',
    'Hakim',
    'Savcı',
    'Noter',
    'Kamu Görevlisi',
    'Diğer'
  ];

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getModalStyles = (type) => {
    const baseStyles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
      borderRadius: '15px',
      boxShadow: theme.palette.mode === 'dark'
        ? '0px 4px 20px rgba(0, 0, 0, 0.5)'
        : '0px 4px 20px rgba(0, 0, 0, 0.1)',
      maxHeight: '90vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'dark' ? '#333' : '#ccc',
        borderRadius: '4px',
      },
    };

    switch (type) {
      case 'signup':
        return {
          ...baseStyles,
          width: 'auto',
          minWidth: '420px',
          p: 3,
        };
      case 'login':
        return {
          ...baseStyles,
          width: 'auto',
          minWidth: '420px',
          p: 3,
        };
      case 'contact':
        return {
          ...baseStyles,
          width: 'auto',
          minWidth: '420px',
          minHeight: '300px',
          p: 3,
        };
      default:
        return {
          ...baseStyles,
          width: 'auto',
          minWidth: '420px',
          p: 3,
        };
    }
  };

  const socialButtonStyle = {
    marginBottom: '8px'
  };

  const handlePlanUpgradeSuccess = (plan) => {
    alert(`${plan.name} planına başarıyla geçiş yaptınız!`);
    setUpgradeModalOpen(false);
  };

  const handlePlanUpgradeError = (error) => {
    alert(error);
    setUpgradeModalOpen(false);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'signup':
        return (
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '371px', mx: 'auto' }}>
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: -10,
                top: -10,
                color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#FFC300',
                }
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3, width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
                <img
                  src="/assets/legaling-logo-yellow.png"
                  alt="Legaling Logo"
                  style={{
                    width: '55px',
                    height: '44px'
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: '#FFC300',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  width: '100%',
                  textAlign: 'center',
                  pl: 0
                }}
              >
                Legaling'e Kayıt Ol
              </Typography>
            </Box>

            <Box sx={{ width: '100%', mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                fullWidth
                variant="outlined"
                className={`${styles.socialLoginButton} ${styles.google}`}
                sx={socialButtonStyle}
                startIcon={<GoogleIcon />}
              >
                Google ile Giriş
              </Button>

              <Button
                fullWidth
                variant="outlined"
                className={`${styles.socialLoginButton} ${styles.linkedin}`}
                sx={socialButtonStyle}
                startIcon={<LinkedInIcon />}
              >
                LinkedIn ile Giriş
              </Button>

              <Button
                fullWidth
                variant="outlined"
                className={`${styles.socialLoginButton} ${styles.apple} ${theme.palette.mode === 'dark' ? styles.dark : styles.light}`}
                sx={{
                  ...socialButtonStyle,
                  border: 'none !important',
                  outline: 'none !important',
                  '&:hover': {
                    border: 'none !important',
                    outline: 'none !important',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  },
                  '& .MuiButton-outlined': {
                    border: 'none !important'
                  }
                }}
                startIcon={<AppleIcon />}
              >
                Apple ile Giriş
              </Button>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                '&::before, &::after': {
                  content: '""',
                  flex: 1,
                  borderBottom: theme.palette.mode === 'dark' ? '1px solid #FFFFFF' : '1px solid #080808'
                }
              }}
            >
              <Typography
                sx={{
                  mx: 2,
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                  fontSize: '14px'
                }}
              >
                veya
              </Typography>
            </Box>

            <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
              <InputField
                label="E-Posta"
                placeholder="E-posta adresinizi giriniz"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
              <Box>
                <InputField
                  label="Şifre"
                  placeholder="Şifrenizi giriniz"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field"
                />
                <FormHelperText sx={{ ml: 1.5, mt: 0.5, fontSize: '12px', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808' }}>
                  Şifreniz rakam ve harf içerecek şekilde en az 8 karakter olmalıdır.
                </FormHelperText>
              </Box>

              <Box>
                <InputField
                  label="Şifre Onayı"
                  placeholder="Şifrenizi tekrar giriniz"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="input-field"
                />
              </Box>

              <InputField
                label="Ad"
                placeholder="Ad*"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />

              <InputField
                label="Soyadı"
                placeholder="Soyadı*"
                name="surname"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                className="input-field"
              />

              <InputField
                label="Cep Telefonu Numarası"
                placeholder="0(5xx) xxx xx xx"
                value={phoneNumber}
                onChange={handlePhoneChange}
                isPhoneNumber={true}
                className="input-field"
              />

              <ThemeProvider theme={datePickerTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Doğum Tarihi"
                    placeholder="Doğum Tarihiniz*"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    className="input-field"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        placeholder: "Doğum Tarihiniz*",
                        className: "input-field"
                      },
                      popper: {
                        sx: {
                          '& .MuiPaper-root': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#202124 !important' : '#FFFFFF !important',
                          },
                          '& .MuiPickersCalendar-root': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#202124 !important' : '#FFFFFF !important',
                          },
                          '& .MuiPickersYear-root': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#202124 !important' : '#FFFFFF !important',
                          },
                          '& .MuiYearCalendar-root': {
                            backgroundColor: theme.palette.mode === 'dark' ? '#202124 !important' : '#FFFFFF !important',
                          },
                          '& .MuiDayCalendar-weekDayLabel': {
                            color: '#FFC300 !important'
                          },
                          '& .MuiPickersDay-root:not(.Mui-selected)': {
                            color: theme.palette.mode === 'dark' ? '#FFFFFF !important' : '#161719 !important'
                          },
                          '& .MuiPickersYear-yearButton:not(.Mui-selected)': {
                            color: theme.palette.mode === 'dark' ? '#FFFFFF !important' : '#161719 !important'
                          },
                          '& .MuiPickersCalendarHeader-label': {
                            color: theme.palette.mode === 'dark' ? '#FFFFFF !important' : '#161719 !important'
                          },
                          '& .MuiPickersArrowSwitcher-button': {
                            color: theme.palette.mode === 'dark' ? '#FFFFFF !important' : '#161719 !important'
                          }
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
              </ThemeProvider>

              <InputField
                select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Mesleğiniz*"
                options={professions}
                className="input-field"
                SelectProps={{
                  IconComponent: (props) => (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      {...props}
                      style={{
                        position: 'absolute',
                        right: 15,
                        pointerEvents: 'none',
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#161719'
                      }}
                    >
                      <path
                        d="M7 10L12 15L17 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )
                }}
              />

              <Box sx={{ mb: 2, width: '100%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      sx={{
                        padding: '8px',
                        marginRight: '8px',
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                        '&.Mui-checked': {
                          color: '#FFC300',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ width: '100%', display: 'block' }}>
                      <Typography 
                        variant="body2" 
                        component="div"
                        sx={{ 
                          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                          textAlign: 'justify',
                          width: '100%',
                          display: 'block'
                        }}
                      >
                        Kişisel verilerimin Aydınlatma Metni kapsamında işlendiği konusunda bilgilendirildim.
                        Üyelik Sözleşmesi'ni ve Açık Rıza Metni'ni okudum ve kabul ediyorum.
                      </Typography>
                    </Box>
                  }
                  sx={{
                    margin: 0,
                    alignItems: 'flex-start',
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                      flex: 1,
                      display: 'block'
                    }
                  }}
                />
              </Box>

              <Box sx={{ mb: 2, width: '100%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptMarketing}
                      onChange={(e) => setAcceptMarketing(e.target.checked)}
                      sx={{
                        padding: '8px',
                        marginRight: '8px',
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                        '&.Mui-checked': {
                          color: '#FFC300',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ width: '100%', display: 'block' }}>
                      <Typography 
                        variant="body2" 
                        component="div"
                        sx={{ 
                          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                          textAlign: 'justify',
                          width: '100%',
                          display: 'block'
                        }}
                      >
                        Tarafıma, yukarıdaki tercihlerim doğrultusunda Legaling tarafından elektronik ileti gönderilmesine izin veririm.
                      </Typography>
                    </Box>
                  }
                  sx={{
                    margin: 0,
                    alignItems: 'flex-start',
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                      flex: 1,
                      display: 'block'
                    }
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                disabled={!acceptTerms}
                sx={{
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
                  },
                  "&:disabled": {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 195, 0, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)'
                  }
                }}
              >
                Kayıt Ol
              </Button>
            </form>
          </Box>
        );

      case 'login':
        return (
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: -10,
                top: -10,
                color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#FFC300',
                }
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3, width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
                <img
                  src="/assets/legaling-logo-yellow.png"
                  alt="Legaling Logo"
                  style={{
                    width: '55px',
                    height: '44px'
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: '#FFC300',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  width: '100%',
                  textAlign: 'center',
                  pl: 0
                }}
              >
                Legaling'e giriş yap
              </Typography>
            </Box>

            <Box sx={{ width: '100%', mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                fullWidth
                variant="outlined"
                className={`${styles.socialLoginButton} ${styles.google}`}
                sx={socialButtonStyle}
                startIcon={<GoogleIcon />}
              >
                Google ile Giriş
              </Button>

              <Button
                fullWidth
                variant="outlined"
                className={`${styles.socialLoginButton} ${styles.linkedin}`}
                sx={socialButtonStyle}
                startIcon={<LinkedInIcon />}
              >
                LinkedIn ile Giriş
              </Button>

              <Button
                fullWidth
                variant="outlined"
                className={`${styles.socialLoginButton} ${styles.apple} ${theme.palette.mode === 'dark' ? styles.dark : styles.light}`}
                sx={{
                  ...socialButtonStyle,
                  border: 'none !important',
                  outline: 'none !important',
                  '&:hover': {
                    border: 'none !important',
                    outline: 'none !important',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  },
                  '& .MuiButton-outlined': {
                    border: 'none !important'
                  }
                }}
                startIcon={<AppleIcon />}
              >
                Apple ile Giriş
              </Button>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                '&::before, &::after': {
                  content: '""',
                  flex: 1,
                  borderBottom: theme.palette.mode === 'dark' ? '1px solid #FFFFFF' : '1px solid #080808'
                }
              }}
            >
              <Typography
                sx={{
                  mx: 2,
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                  fontSize: '14px'
                }}
              >
                veya
              </Typography>
            </Box>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Box sx={{ mb: 4 }}>
                <InputField
                  label="E-Posta"
                  placeholder="E-Posta adresinizi giriniz"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  sx={{
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
              </Box>
              <Box sx={{ mb: 4 }}>
                <InputField
                  label="Şifre"
                  placeholder="Şifrenizi giriniz"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  sx={{
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
              </Box>
              <Button
                type="submit"
                fullWidth
                sx={{
                  width: '371px',
                  height: '42px',
                  bgcolor: "#FFC300",
                  color: "#000",
                  borderRadius: '10px',
                  padding: '12px 15px',
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  mb: 4,
                  "&:hover": {
                    bgcolor: "#FFD700"
                  }
                }}
              >
                Giriş Yap
              </Button>
            </form>

            <Box
              sx={{
                width: '100%',
                borderTop: theme.palette.mode === 'dark' ? '1px solid #FFFFFF' : '1px solid #080808',
                pt: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Button
                onClick={() => {
                  onClose();
                  handleOpenModal('signup');
                }}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#FFC300'
                  }
                }}
              >
                Hesap oluştur
              </Button>
              <Button
                sx={{
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#FFC300'
                  }
                }}
              >
                Şifremi Unuttum
              </Button>
            </Box>
          </Box>
        );

      case 'contact':
        return (
          <Box sx={{ 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            minHeight: '300px'
          }}>
            <Box sx={{
              bgcolor: theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
              pb: 2,
              borderBottom: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              mb: 1
            }}>
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#FFC300',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                  fontSize: '24px',
                  fontWeight: 500,
                  mb: 2,
                  pt: 1,
                  marginLeft: '5px'
                }}
              >
                Bize yazın
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  fontSize: '14px',
                  mb: 1,
                  px: 0.5,
                  maxWidth: '370px',
                  textAlign: 'left',
                  margin: '0 auto',
                  '& a': {
                    color: '#FFC300',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }
                }}
              >
                Aşağıdaki arayüz üzerinden veya doğrudan{' '}
                <a href="mailto:info@legaling.net">info@legaling.net</a>
                {' '}adresinden e-posta atarak bize her zaman ulaşabilirsiniz.
              </Typography>
            </Box>

            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              gap: 2,
              mt: 2,
              alignItems: 'center'
            }}>
              <form onSubmit={handleSubmit} style={{ 
                width: "371px", 
                maxWidth: "100%",
                display: "flex", 
                flexDirection: "column", 
                gap: "16px",
                height: "100%"
              }}>
                {!user ? (
                  <>
                    <InputField
                      label="Ad"
                      placeholder="Ad*"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
                    <InputField
                      label="Soyadı"
                      placeholder="Soyadı*"
                      name="surname"
                      value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      className="input-field"
                    />
                    <InputField
                      label="E-Posta"
                      placeholder="E-posta adresinizi giriniz"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />
                    <InputField
                      select
                      value={formData.profession || ''}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      placeholder="Mesleğiniz"
                      options={professions}
                      className="input-field"
                      SelectProps={{
                        IconComponent: (props) => (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            {...props}
                            style={{
                              position: 'absolute',
                              right: 15,
                              pointerEvents: 'none',
                              color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#161719'
                            }}
                          >
                            <path
                              d="M7 10L12 15L17 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )
                      }}
                    />
                  </>
                ) : (
                  <Typography
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                      fontSize: '14px',
                      width: '100%'
                    }}
                  >
                    {user.name} {user.surname} olarak giriş yaptınız. Size bu bilgilerle ulaşacağız.
                  </Typography>
                )}
                <Box sx={{ flex: 1, minHeight: '180px', width: '100%' }}>
                  <InputField
                    label="Mesajınız"
                    placeholder="Mesajınızı girin"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field message-input"
                    sx={{
                      height: '100%',
                      width: '100%',
                      '& .MuiInputBase-root': {
                        width: '100%',
                        height: '100%',
                        minHeight: '180px !important',
                        borderRadius: '10px',
                        gap: '10px',
                        padding: '12px 15px',
                        '& textarea': {
                          height: '100%',
                          padding: 0,
                          lineHeight: '1.5 !important'
                        }
                      }
                    }}
                  />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    sx={{
                      width: '100%',
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
                    Gönder
                  </Button>
                </Box>
              </form>
              <Box 
                sx={{ 
                  width: '371px',
                  maxWidth: '100%',
                  mt: 3,
                  pt: 3,
                  borderTop: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                    fontSize: '16px',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Şirket Bilgileri
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontSize: '13px',
                        mb: 0.5
                      }}
                    >
                      Ünvanı
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                        fontSize: '14px'
                      }}
                    >
                      Legalıng Yazılım ve Ticaret Anonim Şirketi
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontSize: '13px',
                        mb: 0.5
                      }}
                    >
                      Ticaret Sicil Numarası
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                        fontSize: '14px'
                      }}
                    >
                      342359-5
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontSize: '13px',
                        mb: 0.5
                      }}
                    >
                      Mersis Numarası
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                        fontSize: '14px'
                      }}
                    >
                      0608-1429-7830-0001
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontSize: '13px',
                        mb: 0.5
                      }}
                    >
                      Şirket Merkezi
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                        fontSize: '14px'
                      }}
                    >
                      ŞEHİT MUHTAR MAH. MİS SK. NO: 24 İÇ KAPI NO: 28 BEYOĞLU/İSTANBUL
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        fontSize: '13px',
                        mb: 0.5
                      }}
                    >
                      Tescilli Marka Adı
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                        fontSize: '14px'
                      }}
                    >
                      Legaling
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                      fontSize: '13px',
                      mt: 1,
                      fontStyle: 'italic'
                    }}
                  >
                    Legalıng Yazılım ve Ticaret Anonim Şirketi bir Teknopark İstanbul kuruluşudur.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={getModalStyles(modalType)}>
          {renderModalContent()}
        </Box>
      </Modal>

      <PlanUpgradeModal
        open={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        selectedPlan={selectedPlan}
        currentPlan={user?.plan}
        onSuccess={handlePlanUpgradeSuccess}
        onError={handlePlanUpgradeError}
      />
    </>
  );
};

export default ModalManager;