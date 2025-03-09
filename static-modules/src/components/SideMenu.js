import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, User, Settings, Plus, Heart, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";


const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: "100vh" }}>
      <Sidebar collapsed={collapsed} backgroundColor="#1E1E1E" width="250px">
        <Menu>
          {/* Açma/Kapama Butonu */}
          <MenuItem
            icon={collapsed ? <ChevronRight /> : <ChevronLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              textAlign: "center",
              padding: "10px",
              color: "#FFF",
              cursor: "pointer",
            }}
          >
            {collapsed ? "" : "Menüyü Kapat"}
          </MenuItem>

          {/* Menü Öğeleri */}
          <MenuItem icon={<Home />} style={{ color: "#FFF" }}>Anasayfa</MenuItem>
          <MenuItem icon={<User />} style={{ color: "#FFF" }}>Hesabım</MenuItem>
          <MenuItem icon={<Briefcase />} style={{ color: "#FFF" }}>Ofis Ayarları</MenuItem>
          <MenuItem icon={<Plus />} style={{ color: "#FFF" }}>Kullanıcı Ekle</MenuItem>
          <MenuItem icon={<Heart />} style={{ color: "#FFF" }}>Favorilerim</MenuItem>
          <MenuItem icon={<Settings />} style={{ color: "#FFF" }}>Ayarlar</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideMenu;
