import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Page from "./pages/Page";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Box from "@mui/material/Box";
import "./App.css";
import { AuthProvider, useAuth } from './context/AuthContext';

// Tema Context'i
export const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// Tema tanımları
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#F6F6F6",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#000000",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

// Banner bileşeni
const AdBanner = ({ isDarkMode }) => {
  const { user } = useAuth();
  
  console.log('Current user:', user); // Debug için kullanıcı bilgisini logla
  
  // Plan kontrolü - plan bir obje olduğu için type veya name özelliğini kontrol ediyoruz
  if (!user || user?.plan?.type?.toLowerCase() === 'temel' || user?.plan?.type?.toLowerCase() === 'basic' || 
      user?.plan?.name?.toLowerCase() === 'temel' || user?.plan?.name?.toLowerCase() === 'basic') {
    return (
      <Box
        sx={{
          width: '100%',
          height: '128px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 50px',
          margin: '0 auto',
          backgroundColor: isDarkMode ? '#161719' : '#FFFFFF',
        }}
      >
        <img 
          src="/assets/Ad-Banner.png" 
          alt="Advertisement Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
    );
  }
  return null;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const themeContextValue = {
    isDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: isDarkMode ? '#000000' : '#F6F6F6',
              overflow: 'hidden'
            }}>
              <Header />
              <Box sx={{ 
                display: 'flex', 
                flex: 1,
                minHeight: { xs: 'calc(100vh - 64px - 100px)', md: 'calc(100vh - 64px - 200px)' },
                bgcolor: isDarkMode ? '#000000' : '#F6F6F6',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <SideMenu />
                <Box component="main" sx={{ 
                  flexGrow: 1, 
                  p: { xs: 1, sm: 2, md: 3 },
                  pl: { xs: 0, sm: 2, md: 3 },
                  width: { xs: '100%', md: 'calc(100% - 240px)' },
                  overflow: 'hidden'
                }}>
                  {/* Ana içerik ve yönlendirmeler */}
                  <Box sx={{ 
                    width: '100%',
                    maxWidth: '1400px',
                    mx: 'auto',
                    px: { xs: 1, sm: 2, md: 3 },
                    overflow: 'hidden'
                  }}>
                    <Routes>
                      <Route path="/" element={<Page pageId="home" />} />
                      <Route path="/about" element={<Page pageId="about" />} />
                      <Route path="/account" element={<Page pageId="account" />} />
                      <Route path="/dictionary" element={<Page pageId="dictionary" />} />
                      <Route path="/suggest" element={<Page pageId="suggest" />} />
                      <Route path="/chatbot" element={<Page pageId="chatbot" />} />
                      <Route path="/404" element={<NotFound />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
              <AdBanner isDarkMode={isDarkMode} />
              <Footer />
            </Box>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
