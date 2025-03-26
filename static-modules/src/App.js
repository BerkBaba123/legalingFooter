import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Account from "./pages/Accounts/Account";
import Services from "./pages/Payments/Services";
import PageManager from "./pages/PageManager";
import { AuthProvider } from './context/AuthContext';
import "./App.css";

// Tema context
export const ThemeContext = createContext();
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
};

// Temalar
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#F6F6F6", paper: "#f5f5f5" },
    text: { primary: "#000000" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#000000", paper: "#1e1e1e" },
    text: { primary: "#ffffff" },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  const themeContextValue = { isDarkMode, toggleTheme };

  const [selectedTab, setSelectedTab] = useState('database');

  // 🔧 Modal state'leri doğru yere alındı
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: isDarkMode ? "#000000" : "#F6F6F6",
                overflow: "hidden",
              }}
            >
              <Header />
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  minHeight: { xs: 'calc(100vh - 64px - 100px)', md: 'calc(100vh - 64px - 200px)' },
                  bgcolor: isDarkMode ? "#000000" : "#F6F6F6",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <SideMenu />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: { xs: 1, sm: 2, md: 3 },
                    pt: { xs: 6, sm: 7, md: 8 },
                    pb: { xs: 8, sm: 10, md: 12 },
                    pl: { xs: 0, sm: 2, md: 3 },
                    width: { xs: "100%", md: "calc(100% - 240px)" },
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "1400px",
                      mx: "auto",
                      px: { xs: 1, sm: 2, md: 3 },
                      overflow: "hidden",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<PageManager pageId="home" selectedTab={selectedTab} onTabChange={setSelectedTab} />} />
                      <Route path="/about" element={<PageManager pageId="about" handleOpenModal={handleOpenModal} />} />
                      <Route path="/account" element={<PageManager pageId="account" handleOpenModal={handleOpenModal} />} />
                      <Route path="/suggest" element={<PageManager pageId="suggest" handleOpenModal={handleOpenModal} />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
              <Footer />
            </Box>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
