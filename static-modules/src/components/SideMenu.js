import React, { useState, useEffect } from "react";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Divider, 
  Box, 
  Typography,
  useMediaQuery
} from "@mui/material";
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu as MenuIcon,
  Favorite,
  History,
  Add,
  Lightbulb
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import "./SideMenu.css";

const mainMenuItems = [
  { text: "Anasayfa", icon: <i className="legaling-e80f"></i>, path: "/" },
  { text: "Hesabım", icon: <i className="legaling-e80e"></i>, path: "/account" },
  { text: "Ofis Ayarları", icon: <i className="legaling-e811"></i>, path: "/office-settings" },
  { text: "Kullanıcı Ekle", icon: <i className="legaling-user"></i>, path: "/add-user" },
  { text: "Hesabımı Yükselt", icon: <i className="legaling-e80d"></i>, path: "/upgrade" },
];

const databaseMenuItems = [
  { text: "Favorilerim", icon: <Favorite />, path: "/favorites" },
  { text: "Arama Geçmişi", icon: <History />, path: "/search-history" },
  { text: "Ofis Favorileri", icon: <i className="legaling-e810"></i>, path: "/office-favorites" },
  { text: "Kavram Ekle", icon: <Add />, path: "/add-concept" },
  { text: "Öneriler", icon: <Lightbulb />, path: "/suggestions" },
];

const SideMenu = ({ isDatabaseVisible }) => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();

  useEffect(() => {
    if (isMobile || isTablet) {
      setOpen(false);
    }
  }, [isMobile, isTablet]);

  if (!user) return null;

  const itemHeight = 46;
  const itemMargin = 10;
  const topBottomPadding = 0;
  const mainMenuTotalHeight = (itemHeight + itemMargin) * mainMenuItems.length + topBottomPadding - itemMargin;
  const databaseMenuTotalHeight = (itemHeight + itemMargin) * databaseMenuItems.length + topBottomPadding - itemMargin;

  const toggleDrawer = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleClose = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderMenuItems = (items, isDatabaseMenu = false) => (
    <List sx={{ 
      width: "100%", 
      padding: 0,
      overflow: "visible"
    }}>
      {items.map((item, index) => (
        <ListItem 
          key={index} 
          component={Link} 
          to={item.path}
          onClick={(e) => {
            e.preventDefault();
            handleClose();
            navigate(item.path);
          }}
          selected={location.pathname === item.path}
          sx={{ 
            position: "relative",
            width: isMobile ? "100%" : 44,
            height: 46,
            margin: isMobile ? "0" : "0 auto 10px",
            borderRadius: isMobile ? "0" : "60px",
            padding: isMobile ? "0 16px 0 60px" : 0,
            backgroundColor: location.pathname === item.path ? "#E8E8E8" : "transparent",
            border: "2px solid transparent",
            borderColor: location.pathname === item.path ? "#080808" : "transparent",
            transition: "all 300ms ease",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            overflow: "visible",
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": {
              width: !isMobile && 160,
              backgroundColor: item.text === "Hesabımı Yükselt" ? "#FFC300" : "#E8E8E8",
              "& .menu-text": {
                opacity: 1,
                visibility: "visible",
                borderColor: location.pathname === item.path ? "#080808" : "transparent"
              }
            },
            "&:last-child": {
              marginBottom: 0
            },
            "&.Mui-selected": {
              backgroundColor: "#E8E8E8 !important",
              borderColor: "#080808",
              "& .menu-text": {
                borderColor: "#080808"
              }
            }
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: isMobile ? "40px" : 44,
            width: isMobile ? "40px" : 44,
            height: 46,
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: isMobile ? "absolute" : "absolute",
            left: isMobile ? "10px" : 0,
            top: isMobile ? "0" : 0,
            "& .MuiSvgIcon-root": {
              fontSize: 20,
              width: 20,
              height: 20,
              color: location.pathname === item.path ? "#080808" : theme.palette.mode === "dark" ? "#FFFFFF" : "#161719",
              transition: "color 300ms ease",
              ".MuiListItem-root:hover &": {
                color: theme.palette.mode === "dark" ? "#080808" : "#161719"
              }
            },
            "& i": {
              fontSize: item.text === "Ofis Favorileri" ? 24 : 20,
              width: item.text === "Ofis Favorileri" ? 24 : 20,
              height: item.text === "Ofis Favorileri" ? 24 : 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: item.text === "Hesabımı Yükselt" 
                ? "#FFC300"
                : location.pathname === item.path 
                  ? "#080808" 
                  : theme.palette.mode === "dark" 
                    ? "#FFFFFF" 
                    : "#161719",
              transition: "color 300ms ease",
              ".MuiListItem-root:hover &": {
                color: item.text === "Hesabımı Yükselt" 
                  ? "#FFC300"
                  : theme.palette.mode === "dark" 
                    ? "#080808" 
                    : "#161719"
              }
            }
          }}>
            {item.icon}
          </ListItemIcon>
          <Box
            className="menu-text"
            sx={{
              position: isMobile ? "relative" : "absolute",
              left: isMobile ? "60px" : 42,
              top: isMobile ? "auto" : -2,
              height: isMobile ? "auto" : "calc(100% + 4px)",
              opacity: isMobile ? 1 : 0,
              visibility: isMobile ? "visible" : "hidden",
              padding: isMobile ? "0 0 0 0" : "0 16px 0 0",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              borderRadius: "0 60px 60px 0",
              transition: "all 300ms ease",
              pointerEvents: "none",
              whiteSpace: "nowrap"
            }}
          >
            <Typography
              sx={{
                whiteSpace: "nowrap",
                color: location.pathname === item.path
                  ? "#080808"
                  : isMobile && theme.palette.mode === "dark" 
                    ? "#FFFFFF" 
                    : theme.palette.mode === "dark" 
                      ? "#161719" 
                      : "#161719",
                fontSize: "14px",
                fontWeight: 500
              }}
            >
              {item.text}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );

  // Mobil menü
  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            left: 20,
            top: 137,
            zIndex: 1200,
            backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
            border: "1px solid #E8E8E8",
            borderRadius: "30px",
            width: 45,
            height: 45,
            '&:hover': {
              backgroundColor: theme.palette.mode === "dark" ? "#202124" : "#F5F5F5",
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
              marginTop: "67px",
              height: "calc(100% - 67px)"
            }
          }}
        >
          {renderMenuItems(mainMenuItems)}
          {isDatabaseVisible && (
            <>
              <Divider sx={{ my: 2, borderColor: theme.palette.mode === "dark" ? "#5D5D5D" : "#E8E8E8" }} />
              {renderMenuItems(databaseMenuItems, true)}
            </>
          )}
        </Drawer>
      </>
    );
  }

  // Desktop menü
  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: 45,
          flexShrink: 0,
          position: 'fixed',
          left: 100,
          top: 137,
          zIndex: 1200,
          overflow: "visible",
          "& .MuiDrawer-paper": {
            width: 45,
            height: `${mainMenuTotalHeight}px`,
            backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            position: "static",
            overflow: "visible",
            "& .MuiListItemIcon-root": {
              minWidth: "auto",
              justifyContent: "center",
              margin: "0 auto",
              display: "flex",
              alignItems: "center"
            }
          },
        }}
      >
        {renderMenuItems(mainMenuItems)}
      </Drawer>
      {isDatabaseVisible && (
        <Drawer
          variant="permanent"
          open={true}
          sx={{
            width: 45,
            flexShrink: 0,
            position: 'fixed',
            left: 100,
            top: 137 + mainMenuTotalHeight + 30,
            zIndex: 1200,
            overflow: "visible",
            "& .MuiDrawer-paper": {
              width: 45,
              height: `${databaseMenuTotalHeight}px`,
              backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              position: "static",
              overflow: "visible",
              "& .MuiListItemIcon-root": {
                minWidth: "auto",
                justifyContent: "center",
                margin: "0 auto",
                display: "flex",
                alignItems: "center"
              }
            },
          }}
        >
          {renderMenuItems(databaseMenuItems, true)}
        </Drawer>
      )}
    </>
  );
};

export default SideMenu;
