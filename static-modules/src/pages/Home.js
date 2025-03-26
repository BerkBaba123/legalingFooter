// src/pages/Home.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Tabs, Tab, ToggleButtonGroup, ToggleButton, styled, InputBase, Select, MenuItem, Button, TextField, useTheme, InputLabel, FormControl, Card, CardContent, CardActions, Grid, FormControlLabel, Switch, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import SideMenu from '../components/SideMenu';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../App';
import { getPlans } from '../services/api';
import CheckIcon from '@mui/icons-material/Check';
import PlanUpgradeModal from '../components/PlanUpgradeModal';
import Alerts from '../components/Alerts';
import ModalManager from '../components/ModalManager';
import { searchDictionary } from '../data/DictionaryDataBase';

const Home = ({ selectedTab, onTabChange }) => {
  const [searchType, setSearchType] = useState('concepts');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [inputText, setInputText] = useState('');
  const theme = useTheme();

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: 400,
  height: 50,
  backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
  borderRadius: '30px',
  padding: '4px',
  overflow: 'hidden',
  "& .MuiToggleButton-root": {
    width: "50%",
    height: '42px',
    border: "none",
    color: theme.palette.mode === "dark" ? "#FFFFFF" : "#080808",
    fontSize: '14px',
    fontWeight: 500,
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
    borderRadius: 0,
    "&:first-of-type": {
      borderTopLeftRadius: '30px',
      borderBottomLeftRadius: '30px',
      borderRight: theme.palette.mode === "dark" ? "1px solid #5D5D5D" : "1px solid #D1D1D1",
    },
    "&:last-of-type": {
      borderTopRightRadius: '30px',
      borderBottomRightRadius: '30px',
      borderLeft: theme.palette.mode === "dark" ? "1px solid #5D5D5D" : "1px solid #D1D1D1",
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#E8E8E8",
      color: theme.palette.mode === "dark" ? "#FFFFFF" : "#080808",
      "&:hover": {
        backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#E8E8E8",
      }
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "rgba(8, 8, 8, 0.1)" : "rgba(232, 232, 232, 0.5)",
    }
  }
}));


  const handleTabChange = (event, newValue) => {
    if (newValue !== null) {
      onTabChange(newValue);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleLanguageSwitch = () => {
    setIsReversed(!isReversed);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    if (text.length <= 150) {
      setInputText(text);
    }
  };

  const handleSendText = () => {
    // Send text işlemi buraya eklenecek
    console.log('Sending text:', inputText);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = searchDictionary(searchQuery, searchType);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const SendButton = () => (
    <Button
      onClick={handleSendText}
      disabled={!inputText}
      sx={{
        minWidth: 'auto',
        width: '45px',
        height: '45px',
        padding: '10px',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
          '& i': {
            color: '#FFC300'
          }
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: 'none'
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
          cursor: 'not-allowed',
          opacity: 0.5,
          border: 'none'
        }
      }}
    >
      <i
        className="legaling-e815"
        style={{
          fontSize: '22px',
          opacity: inputText ? 1 : 0.5,
          transition: 'all 0.2s ease',
          filter: inputText ? 'none' : 'grayscale(100%)',
          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808'
        }}
      />
    </Button>
  );

  return (
    <Box>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row'
        },
        alignItems: {
          xs: 'flex-end',
          sm: 'center'
        },
        marginTop: '32px',
        marginBottom: {
          xs: '16px',
          sm: '0'
        },
        paddingLeft: {
          xs: '0',
          sm: '0',
          md: '125px'
        }
      }}>
        <Box sx={{
          display: 'flex',
          gap: '15px',
          marginBottom: {
            xs: '16px',
            sm: '0'
          },
          marginLeft: {
            xs: '0',
            sm: '0',
            md: '0'
          },
          marginRight: {
            xs: '20px',
            sm: '40px',
            md: '215px'
          },
          order: {
            xs: 1,
            sm: 2
          }
        }}>
          <Button
            sx={{
              width: '59px',
              height: '36px',
              padding: '8px 24px',
              borderRadius: '15px',
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#E8E8E8',
              '&:hover': {
                backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#E8E8E8',
              },
              '&:active': {
                backgroundColor: '#FFC300',
              }
            }}
          />
          <Button
            sx={{
              minWidth: '30px',
              width: '30px',
              height: '30px',
              padding: 0,
              border: theme => theme.palette.mode === 'dark' ? '2px solid #FFFFFF' : '2px solid #080808',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'transparent'
              },
              '&:active': {
                backgroundColor: '#FFC300',
                border: '2px solid #FFC300'
              }
            }}
          >
            <Box
              component="img"
              src="/assets/legaling_icon/info.svg"
              alt="Info"
              sx={{
                width: '20px',
                height: '20px',
                filter: theme => theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0) invert(0)'
              }}
            />
          </Button>
        </Box>
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          alignItems: {
            xs: 'center',
            sm: 'center'
          },
          justifyContent: {
            xs: 'center',
            sm: 'flex-start'
          },
          marginLeft: {
            xs: '0',
            sm: '0',
            md: '0'
          },
          position: 'relative',
          gap: {
            xs: '15px',
            sm: '20px'
          },
          order: {
            xs: 2,
            sm: 1
          },
          paddingLeft: {
            xs: '0',
            sm: '0',
            md: '0'
          }
        }}>
          <StyledToggleButtonGroup
            value={selectedTab}
            exclusive
            onChange={handleTabChange}
            aria-label="platform"
          >
            <ToggleButton value="database">
              Veri Tabanı
            </ToggleButton>
            <ToggleButton value="translation">
              Çeviri Robotu
            </ToggleButton>
          </StyledToggleButtonGroup>
          <Box
            component="img"
            src={selectedTab === 'database' ? "/assets/betaFrame 62.png" : "/assets/sparkles-svgrepo-com 1.png"}
            alt={selectedTab === 'database' ? "Beta" : "Sparkles"}
            sx={{
              width: {
                xs: selectedTab === 'database' ? '42px' : '18px',
                sm: selectedTab === 'database' ? '52px' : '22px'
              },
              height: {
                xs: selectedTab === 'database' ? '30px' : '18px',
                sm: selectedTab === 'database' ? '37px' : '22px'
              },
              position: {
                xs: 'absolute',
                sm: 'relative'
              },
              top: {
                xs: '-25px',
                sm: 'auto'
              },
              right: {
                xs: '0',
                sm: 'auto'
              },
              marginLeft: {
                xs: '0',
                sm: selectedTab === 'database' ? '-20px' : '-30px'
              },
              marginTop: {
                xs: '0',
                sm: selectedTab === 'database' ? '-51px' : '-25px'
              }
            }}
          />
        </Box>
      </Box>
      {selectedTab === 'database' && (
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '90%',
              md: '1060px'
            },
            height: 'auto',
            minHeight: {
              xs: '220px',
              sm: '250px',
              md: '269px'
            },
            padding: {
              xs: '40px 16px',
              sm: '60px 30px',
              md: '80px 45px 70px 45px'
            },
            gap: '20px',
            borderRadius: '15px',
            backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
            margin: '0 auto',
            marginTop: '20px',
            position: 'relative'
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: {
                xs: '20px',
                sm: '22px',
                md: '24px'
              },
              lineHeight: '100%',
              letterSpacing: '0%',
              color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
              marginBottom: '20px'
            }}
          >
            Legaling'de Ara
          </Typography>
          <Box
            sx={{
              width: '100%',
              borderBottom: theme =>
                theme.palette.mode === 'dark'
                  ? '1px solid #FFFFFF'
                  : '1px solid #080808',
              marginBottom: '20px'
            }}
          />
          <Box sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            gap: {
              xs: '0',
              md: '0'
            }
          }}>
            <InputBase
              placeholder="Profesyoneller için, profesyoneller tarafından..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{
                width: {
                  xs: '100%',
                  md: '646.85px'
                },
                height: {
                  xs: '42px',
                  sm: '45px',
                  md: '50px'
                },
                backgroundColor: '#E8E8E8',
                borderRadius: {
                  xs: '10px 10px 0 0',
                  md: '15px 0 0 15px'
                },
                border: {
                  xs: '1px solid #5D5D5D',
                  md: 'none'
                },
                borderBottom: {
                  xs: '1px solid #5D5D5D',
                  md: 'none'
                },
                borderRight: {
                  xs: 'none',
                  md: '1px solid #D1D1D1'
                },
                paddingLeft: '15px',
                paddingRight: '15px',
                '& .MuiInputBase-input': {
                  fontSize: {
                    xs: '14px',
                    sm: '16px',
                    md: '18px'
                  },
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#161719'
                },
                '&::placeholder': {
                  color: '#161719',
                  opacity: 1,
                  fontSize: {
                    xs: '14px',
                    sm: '16px',
                    md: '18px'
                  },
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle'
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: {
                xs: '0',
                md: '0'
              },
              width: {
                xs: '100%',
                md: 'auto'
              }
            }}>
              <Select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="homepage-select"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: '171.15px !important',
                      marginTop: '4px !important',
                      backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#E8E8E8',
                      borderRadius: '10px !important'
                    }
                  }
                }}
                IconComponent={() => (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'absolute',
                    right: '10px',
                    gap: '2px',
                    pointerEvents: 'none'
                  }}>
                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none">
                      <path d="M7 3.5L4 0.5L1 3.5" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none">
                      <path d="M1 0.5L4 3.5L7 0.5" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Box>
                )}
                sx={{
                  width: {
                    xs: '50%',
                    md: '171.15px'
                  },
                  height: {
                    xs: '42px',
                    sm: '45px',
                    md: '50px'
                  },
                  backgroundColor: '#E8E8E8',
                  borderRadius: {
                    xs: '0 0 0 10px',
                    md: '0'
                  },
                  border: {
                    xs: '1px solid #5D5D5D',
                    md: 'none'
                  },
                  borderTop: {
                    xs: 'none',
                    md: 'none'
                  },
                  borderRight: {
                    xs: '1px solid #5D5D5D',
                    md: '1px solid #000000'
                  },
                  padding: {
                    xs: '10px 15px',
                    sm: '12px 18px',
                    md: '14px 20px'
                  },
                  '& .MuiSelect-select': {
                    padding: '0',
                    fontSize: {
                      xs: '14px',
                      sm: '15px',
                      md: '16px'
                    },
                    fontWeight: 400,
                    color: '#161719'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiMenuItem-root': {
                    '&.Mui-selected': {
                      backgroundColor: '#FFC300 !important'
                    },
                    '&:hover': {
                      backgroundColor: '#FFC300'
                    }
                  }
                }}
              >
                <MenuItem value="concepts">Kavramlarda</MenuItem>
                <MenuItem value="sentences">Cümlelerde</MenuItem>
              </Select>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{
                  width: {
                    xs: '50%',
                    md: '152px'
                  },
                  height: {
                    xs: '42px',
                    sm: '45px',
                    md: '50px'
                  },
                  gap: '10px',
                  padding: {
                    xs: '10px 20px',
                    sm: '12px 30px',
                    md: '14px 45px'
                  },
                  borderRadius: {
                    xs: '0 0 10px 0',
                    md: '0 15px 15px 0'
                  },
                  border: {
                    xs: '1px solid #5D5D5D',
                    md: 'none'
                  },
                  borderTop: {
                    xs: 'none',
                    md: 'none'
                  },
                  borderLeft: {
                    xs: 'none',
                    md: 'none'
                  },
                  backgroundColor: '#ECBC00',
                  color: '#000000',
                  textTransform: 'none',
                  fontSize: {
                    xs: '14px',
                    sm: '15px',
                    md: '16px'
                  },
                  fontWeight: 400,
                  '&:hover': {
                    backgroundColor: '#D4A900'
                  },
                  boxShadow: 'none'
                }}
              >
                {isSearching ? <CircularProgress size={24} color="inherit" /> : 'Ara'}
              </Button>
            </Box>
          </Box>

          {/* Arama Sonuçları */}
          {searchResults.length > 0 && (
            <Box sx={{ mt: 4 }}>
              {/* Doğrudan Karşılıklar Tablosu */}
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: '10px',
                  backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFC300',
                    mb: 2,
                    fontSize: '18px',
                    fontWeight: 600
                  }}
                >
                  "{searchQuery}" Kavramının İngilizce-Türkçe Sözlükteki Karşılıkları
                </Typography>

                {/* Desktop Table View */}
                <Box sx={{
                  display: {
                    xs: 'none',
                    sm: 'block'
                  }
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '5%'
                        }}>#</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Kavram</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '10%'
                        }}>Alan</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Karşılık</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '30%'
                        }}>Cümle</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '25%'
                        }}>Açıklama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults
                        .filter(result => result.tr.toLowerCase() === searchQuery.toLowerCase() ||
                                        result.en.toLowerCase() === searchQuery.toLowerCase())
                        .map((result, index) => (
                          <tr key={result.id}>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{index + 1}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.tr}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.category}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.en}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.examples && result.examples.length > 0 ? result.examples[0] : '-'}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.description || '-'}</td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>

                {/* Mobile Card View */}
                <Box sx={{
                  display: {
                    xs: 'flex',
                    sm: 'none'
                  },
                  flexDirection: 'column',
                  gap: 2
                }}>
                  {searchResults
                    .filter(result => result.tr.toLowerCase() === searchQuery.toLowerCase() ||
                                    result.en.toLowerCase() === searchQuery.toLowerCase())
                    .map((result, index) => (
                      <Box
                        key={result.id}
                        sx={{
                          p: 2,
                          borderRadius: '10px',
                          backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          mb: 2
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ color: '#FFC300', fontWeight: 600, mb: 2 }}>
                          #{index + 1}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Kavram:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.tr}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Alan:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.category}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Karşılık:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.en}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Cümle:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.examples && result.examples.length > 0 ? result.examples[0] : '-'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Açıklama:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.description || '-'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>

              {/* İçinde Geçtiği Kavramlar Tablosu */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: '10px',
                  backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFC300',
                    mb: 2,
                    fontSize: '18px',
                    fontWeight: 600
                  }}
                >
                  "{searchQuery}" Kavramının İngilizce-Türkçe Sözlükte İçinde Geçtiği Kavramlar
                </Typography>

                {/* Desktop Table View */}
                <Box sx={{
                  display: {
                    xs: 'none',
                    sm: 'block'
                  }
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '5%'
                        }}>#</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Kavram</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '10%'
                        }}>Alan</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Karşılık</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '30%'
                        }}>Cümle</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '25%'
                        }}>Açıklama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults
                        .filter(result => (result.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         result.en.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                         result.tr.toLowerCase() !== searchQuery.toLowerCase() &&
                                         result.en.toLowerCase() !== searchQuery.toLowerCase())
                        .map((result, index) => (
                          <tr key={result.id}>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{index + 1}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.tr}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.category}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.en}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.examples && result.examples.length > 0 ? result.examples[0] : '-'}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.description || '-'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Box>

                {/* Mobile Card View */}
                <Box sx={{
                  display: {
                    xs: 'flex',
                    sm: 'none'
                  },
                  flexDirection: 'column',
                  gap: 2
                }}>
                  {searchResults
                    .filter(result => (result.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     result.en.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                     result.tr.toLowerCase() !== searchQuery.toLowerCase() &&
                                     result.en.toLowerCase() !== searchQuery.toLowerCase())
                    .map((result, index) => (
                      <Box
                        key={result.id}
                        sx={{
                          p: 2,
                          borderRadius: '10px',
                          backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          mb: 2
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ color: '#FFC300', fontWeight: 600, mb: 2 }}>
                          #{index + 1}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Kavram:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.tr}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Alan:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.category}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Karşılık:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.en}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Cümle:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.examples && result.examples.length > 0 ? result.examples[0] : '-'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Açıklama:
                            </Typography>
                            <Typography variant="body1" sx={{
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.description || '-'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {selectedTab === 'translation' && (
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '90%',
              md: '1060px'
            },
            height: {
              xs: '600px',
              sm: '550px',
              md: '478px'
            },
            borderRadius: '15px',
            padding: {
              xs: '10px',
              sm: '12px 0',
              md: '15px 0'
            },
            backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
            margin: '0 auto',
            marginTop: '20px',
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: {
                xs: '60px',
                sm: '70px',
                md: '80px'
              },
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: '#5D5D5D',
              zIndex: 1
            }}
          />
          <Button
            onClick={handleLanguageSwitch}
            sx={{
              position: 'absolute',
              right: '50%',
              top: {
                xs: '15px',
                sm: '18px',
                md: '20px'
              },
              transform: 'translate(50%, 0)',
              minWidth: {
                xs: '40px',
                sm: '44px',
                md: '48px'
              },
              width: {
                xs: '40px',
                sm: '44px',
                md: '48px'
              },
              height: {
                xs: '40px',
                sm: '44px',
                md: '48px'
              },
              padding: 0,
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '50%',
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'transparent',
                '& .MuiSvgIcon-root': {
                  color: '#FFC300'
                }
              }
            }}
          >
            <SwapHorizIcon
              sx={{
                fontSize: '44px',
                color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                transition: 'color 0.2s ease'
              }}
            />
          </Button>
          {/* Dil Bölümleri */}
          {isReversed ? (
            <>
              {/* Sol Bölüm - Aktif Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: {
                      xs: '60px',
                      sm: '70px',
                      md: '80px'
                    },
                    bottom: {
                      xs: '15px',
                      sm: '18px',
                      md: '20px'
                    },
                    width: '1px',
                    backgroundColor: '#5D5D5D'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  İngilizce
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="for professionals by professionals..."
                  variant="standard"
                  inputProps={{
                    maxLength: 150
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      '&:before, &:after': {
                        display: 'none'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0,
                      '&::placeholder': {
                        color: '#6B7280',
                        opacity: 1
                      }
                    }
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: {
                    xs: '10px',
                    sm: '12px',
                    md: '15px'
                  },
                  left: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  right: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        sm: '13px',
                        md: '14px'
                      },
                      color: '#6B7280'
                    }}
                  >
                    {inputText.length}/150
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={!inputText.trim()}
                    sx={{
                      minWidth: "auto",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#1A1A1A",
                      "&:hover": {
                        backgroundColor: "#2A2A2A",
                        "& .MuiSvgIcon-root": {
                          color: "#FFC300"
                        }
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(26, 26, 26, 0.3)",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                  >
                    <SendIcon sx={{
                      fontSize: "20px",
                      color: "#fff",
                      transition: "color 0.2s ease"
                    }} />
                  </Button>
                </Box>
              </Box>
              {/* Sağ Bölüm - Disabled Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  paddingLeft: {
                    xs: '25px',
                    sm: '30px',
                    md: '40px'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  Türkçe
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  placeholder="profesyoneller için profesyoneller tarafından..."
                  variant="standard"
                  disabled
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      backgroundColor: 'transparent',
                      '&:before, &:after': {
                        display: 'none'
                      },
                      '&.Mui-disabled': {
                        color: '#6B7280',
                        WebkitTextFillColor: '#6B7280'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0
                    }
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              {/* Sol Bölüm - Aktif Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: {
                      xs: '60px',
                      sm: '70px',
                      md: '80px'
                    },
                    bottom: {
                      xs: '15px',
                      sm: '18px',
                      md: '20px'
                    },
                    width: '1px',
                    backgroundColor: '#5D5D5D'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  Türkçe
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="profesyoneller için profesyoneller tarafından..."
                  variant="standard"
                  inputProps={{
                    maxLength: 150
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      '&:before, &:after': {
                        display: 'none'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0,
                      '&::placeholder': {
                        color: '#6B7280',
                        opacity: 1
                      }
                    }
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: {
                    xs: '10px',
                    sm: '12px',
                    md: '15px'
                  },
                  left: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  right: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        sm: '13px',
                        md: '14px'
                      },
                      color: '#6B7280'
                    }}
                  >
                    {inputText.length}/150
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={!inputText.trim()}
                    sx={{
                      minWidth: "auto",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#1A1A1A",
                      "&:hover": {
                        backgroundColor: "#2A2A2A",
                        "& .MuiSvgIcon-root": {
                          color: "#FFC300"
                        }
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(26, 26, 26, 0.3)",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                  >
                    <SendIcon sx={{
                      fontSize: "20px",
                      color: "#fff",
                      transition: "color 0.2s ease"
                    }} />
                  </Button>
                </Box>
              </Box>
              {/* Sağ Bölüm - Disabled Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  paddingLeft: {
                    xs: '25px',
                    sm: '30px',
                    md: '40px'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  İngilizce
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  placeholder="for professionals by professionals..."
                  variant="standard"
                  disabled
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      '&:before, &:after': {
                        display: 'none'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0
                    }
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
