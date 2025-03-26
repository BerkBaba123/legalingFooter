import React from "react";
import { AppBar, Toolbar, Typography, Container, Box, useMediaQuery } from "@mui/material";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { useTheme } from "@mui/material/styles";
import Hyperlink from "./Hyperlink";
import "./Footer.css";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="static"
      component="footer"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#080808" : "#E2E3E5",
        color: theme.palette.text.primary,
        width: "100%",
        height: "auto",
        minHeight: { xs: "auto", md: "319px" },
        borderTop: "1px solid #5D5D5D",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "16px" : "20px",
        marginTop: "auto",
        marginBottom: 0,
        paddingBottom: isMobile ? "16px" : "20px"
      }}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          height: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: {
            xs: "16px",
            sm: "20px 40px",
            md: "20px 100px",
            lg: "20px 341px 40px 341px"
          }
        }}
      >
        <Toolbar sx={{ 
          flexDirection: "column", 
          textAlign: "center", 
          height: "100%",
          gap: { xs: "16px", sm: "20px" },
          padding: { xs: "0", sm: "0" },
          width: "100%"
        }}>
          {/* Marka ve Telif Hakkı */}
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: "bold", 
              color: theme.palette.mode === "dark" ? "#FFD700" : "#000",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              width: "100%"
            }}
          >
            LEGALING tam kapsamlı hukuk veri tabanıdır.
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              width: "100%"
            }}
          >
            ©2024, Legaling Yazılım ve Ticaret A.Ş. Tüm Hakları Saklıdır.
          </Typography>

          {/* Hukuki Bağlantılar */}
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center", 
              alignItems: "center",
              gap: { xs: "12px", sm: "20px" }, 
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              width: "100%"
            }}
          >
            <Hyperlink url="/veri-sahibi-basvuru-formu" label="Veri Sahibi Başvuru Formu" />
            <Hyperlink url="/aydinlatma-metni" label="Aydınlatma Metni" />
            <Hyperlink url="/kullanim-kosullari" label="Kullanım Koşulları ve Üyelik Sözleşmesi" />
            <Hyperlink url="/cerez-politikasi" label="Çerez Politikası" />
          </Box>

          {/* Sosyal Medya İkonları */}
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: { xs: "16px", sm: "20px" },
              marginTop: { xs: "8px", sm: "0" },
              width: "100%"
            }}
          >
            <a href="https://instagram.com/legalingapp" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={isMobile ? 20 : 24} color={theme.palette.mode === "dark" ? "#fff" : "#000"} />
            </a>
            <a href="https://twitter.com/legalingapp" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={isMobile ? 20 : 24} color={theme.palette.mode === "dark" ? "#fff" : "#000"} />
            </a>
            <a href="https://linkedin.com/company/legaling" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={isMobile ? 20 : 24} color={theme.palette.mode === "dark" ? "#fff" : "#000"} />
            </a>
          </Box>

          {/* App Store ve Google Play Linkleri */}
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center", 
              alignItems: "center",
              gap: { xs: "12px", sm: "20px" },
              width: "100%"
            }}
          >
            <a href="https://apps.apple.com/tr/app/legaling/id1234567890" target="_blank" rel="noopener noreferrer">
              <img 
                src="/assets/app-store.png" 
                alt="App Store" 
                style={{ 
                  height: isMobile ? "36px" : "40px",
                  width: "auto"
                }} 
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.legaling.app" target="_blank" rel="noopener noreferrer">
              <img 
                src="/assets/google-play.png" 
                alt="Google Play" 
                style={{ 
                  height: isMobile ? "36px" : "40px",
                  width: "auto"
                }} 
              />
            </a>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;