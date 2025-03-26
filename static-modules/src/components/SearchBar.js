import React, { useState } from 'react';
import { Box, IconButton, InputBase, Paper, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ placeholder = "Aramak istediğiniz kelimeyi yazın..." }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: {
        xs: '90%',
        sm: '500px',
        md: '600px'
      },
      margin: '0 auto',
      padding: {
        xs: '0 8px',
        sm: '0 16px',
        md: '0 24px'
      }
    }}>
      <Paper
        component="form"
        elevation={0}
        sx={{
          p: '2px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: { 
            xs: '36px', 
            sm: '40px',
            md: '44px' 
          },
          backgroundColor: theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
          borderRadius: { 
            xs: '18px',
            sm: '20px',
            md: '22px'
          },
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            border: `1px solid ${theme.palette.mode === 'dark' ? '#FFC300' : '#000000'}`,
          }
        }}
      >
        <IconButton 
          type="button" 
          sx={{ 
            p: { 
              xs: '4px',
              sm: '6px',
              md: '8px' 
            },
            ml: {
              xs: '2px',
              sm: '4px',
              md: '6px'
            },
            minWidth: { 
              xs: '28px',
              sm: '32px',
              md: '36px'
            },
            height: { 
              xs: '28px',
              sm: '32px',
              md: '36px'
            },
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#161719'
          }} 
          aria-label="search"
        >
          <SearchIcon sx={{ 
            fontSize: { 
              xs: 16, 
              sm: 18,
              md: 20 
            } 
          }} />
        </IconButton>
        <InputBase
          sx={{
            ml: {
              xs: 0.5,
              sm: 0.75,
              md: 1
            },
            flex: 1,
            fontSize: { 
              xs: '12px', 
              sm: '13px',
              md: '14px' 
            },
            '& .MuiInputBase-input': {
              padding: { 
                xs: '4px', 
                sm: '6px 4px',
                md: '8px 6px' 
              },
              height: {
                xs: '20px',
                sm: '24px',
                md: '28px'
              },
              '&::placeholder': {
                color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#161719',
                opacity: 0.5,
                fontSize: { 
                  xs: '12px', 
                  sm: '13px',
                  md: '14px' 
                },
                lineHeight: {
                  xs: '20px',
                  sm: '24px',
                  md: '28px'
                }
              },
            },
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#161719'
          }}
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          inputProps={{ 
            'aria-label': 'search',
            style: { 
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }
          }}
        />
        {searchText && (
          <IconButton
            sx={{
              p: { 
                xs: '4px',
                sm: '6px',
                md: '8px' 
              },
              mr: { 
                xs: '2px',
                sm: '4px',
                md: '6px'
              },
              minWidth: { 
                xs: '28px',
                sm: '32px',
                md: '36px'
              },
              height: { 
                xs: '28px',
                sm: '32px',
                md: '36px'
              },
              color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#161719',
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.mode === 'dark' ? '#FFC300' : '#000000'
              }
            }}
            aria-label="clear"
            onClick={handleClear}
          >
            <CloseIcon sx={{ 
              fontSize: { 
                xs: 14, 
                sm: 16,
                md: 18 
              } 
            }} />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
};

export default SearchBar; 