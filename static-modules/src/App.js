import React from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Hyperlink from "./components/Hyperlink";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import Forms from "./components/Forms";
import Alerts from "./components/Alerts";
import ModalPage from "./components/ModalPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <SideMenu />
      <div className="main-content">
        <Header />
        <div className="container mt-4 text-center">
          <h1>Static Modules</h1>
          <div className="mt-3">
            <Button type="primary" label="Primary" />
            <Button type="secondary" label="Secondary" />
            <Button type="tertiary" label="Tertiary" />
          </div>
          <Forms />
          <Alerts />
          <ModalPage />
          <div className="mt-3">
            <Hyperlink url="https://www.linkedin.com/company/legaling/posts/?feedView=all" label="LinkedIn Sayfası" icon="linkedin" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;