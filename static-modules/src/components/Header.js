import React from 'react';
import './Header.css';
import { Bell } from 'lucide-react'; // Sağ üstteki ikon için

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/assets/legaling-logo.png" alt="Legaling Logo" />
      </div>
      <nav className="header__nav">
        <a href="#home">Anasayfa</a>
        <a href="#about">Hakkımızda</a>
        <a href="#services">Hizmetler</a>
        <a href="#contact">İletişim</a>
      </nav>
      <div className="header__actions">
        <button className="header__button">Üye Ol</button>
        <Bell className="header__icon" />
      </div>
    </header>
  );
};

export default Header;
