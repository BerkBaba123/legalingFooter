import React from "react";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  Box, 
  Typography, 
  useMediaQuery,
  IconButton
} from "@mui/material";
import { 
  Favorite, 
  History, 
  Business, 
  Add, 
  Lightbulb,
  Menu as MenuIcon
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { text: "Favorilerim", icon: <Favorite />, path: "/favorites" },
  { text: "Arama Geçmişi", icon: <History />, path: "/search-history" },
  { text: "Ofis Favorileri", icon: <i className="legaling-e810"></i>, path: "/office-favorites" },
  { text: "Kavram Ekle", icon: <Add />, path: "/add-concept" },
  { text: "Öneriler", icon: <Lightbulb />, path: "/suggestions" },
];

const DatabaseSideMenu = ({ isVisible }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useAuth();

  // Her bir menü öğesi için gerekli yükseklik hesaplaması
  const itemHeight = 46;
  const itemMargin = 10;
  const topBottomPadding = 0;
  const totalHeight = (itemHeight + itemMargin) * menuItems.length + topBottomPadding - itemMargin;

  // Ana menünün yükseklik hesaplaması
  const mainMenuItemCount = 5;
  const mainMenuTotalHeight = (itemHeight + itemMargin) * mainMenuItemCount - itemMargin;
  const mainMenuTopPosition = 137;
  const mainMenuEndPosition = mainMenuTopPosition + mainMenuTotalHeight;
  const spacing = 30;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Kullanıcı giriş yapmamışsa veya isVisible false ise menüyü gösterme
  if (!user || !isVisible) return null;

  const renderMenuItems = () => (
    <List sx={{ 
      width: "100%", 
      padding: 0,
      overflow: "visible"
    }}>
      {menuItems.map((item, index) => (
        <ListItem 
          button 
          key={index} 
          component={Link} 
          to={item.path}
          onClick={() => isMobile && setMobileOpen(false)}
          selected={location.pathname === item.path}
          sx={{ 
            position: "relative",
            width: isMobile ? "100%" : 44,
            height: 46,
            margin: isMobile ? "0" : "0 auto 10px",
            borderRadius: "100px",
            padding: isMobile ? "0 16px 0 60px" : "13px",
            backgroundColor: location.pathname === item.path ? "#E8E8E8" : "transparent",
            border: "2px solid transparent",
            borderColor: location.pathname === item.path ? "#080808" : "transparent",
            transition: "all 300ms ease",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            overflow: "hidden",
            "&:hover": {
              width: !isMobile && 160,
              backgroundColor: item.text === "Hesabımı Yükselt" ? "#FFC300" : "#E8E8E8"
            },
            "&:last-child": {
              marginBottom: 0
            },
            "&.Mui-selected": {
              backgroundColor: "#E8E8E8 !important",
              borderColor: "#080808"
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
          <Typography
            sx={{
              position: isMobile ? "relative" : "absolute",
              left: isMobile ? "60px" : 44,
              whiteSpace: "nowrap",
              color: theme.palette.mode === "dark" ? "#161719" : "#161719",
              fontSize: "14px",
              fontWeight: 500,
              opacity: isMobile ? 1 : 0,
              transition: "opacity 300ms ease",
              padding: isMobile ? "0 0 0 0" : 0,
              ".MuiListItem-root:hover &": {
                opacity: 1
              }
            }}
          >
            {item.text}
          </Typography>
        </ListItem>
      ))}
    </List>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            left: 20,
            top: mainMenuEndPosition + spacing,
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
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: 280,
              backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
              marginTop: "67px",
              height: "calc(100% - 67px)"
            }
          }}
        >
          {renderMenuItems()}
        </Drawer>
      </>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        width: 45,
        flexShrink: 0,
        position: 'fixed',
        left: 100,
        top: mainMenuEndPosition + spacing,
        zIndex: 1200,
        overflow: "visible",
        display: { xs: 'none', sm: 'block' },
        "& .MuiDrawer-paper": {
          width: 45,
          height: `${totalHeight}px`,
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
      {renderMenuItems()}
    </Drawer>
  );
};

export default DatabaseSideMenu; 