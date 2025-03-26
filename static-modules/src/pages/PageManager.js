// src/pages/PageManager.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';
import Home from './Home';
import About from './About';
import Account from './Accounts/Account';
import Services from './Payments/Services';
import NotFound from './NotFound';
import SideMenu from '../components/SideMenu';
import PlanUpgradeModal from '../components/PlanUpgradeModal';
import ModalManager from '../components/ModalManager';
import Alerts from '../components/Alerts';
import { useAuth } from '../context/AuthContext';

const PageManager = ({ pageId: propPageId, selectedTab: propSelectedTab, onTabChange: propOnTabChange, handleOpenModal }) => {
  const { pageId: urlPageId } = useParams();
  const [selectedTab, setSelectedTab] = useState(propSelectedTab || 'database');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', profession: '', message: '' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const alertRef = React.useRef();
  const { user, login } = useAuth();

  // Tab değişikliğini parent'a iletmek için
  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
    if (propOnTabChange) {
      propOnTabChange(newTab);
    }
  };

  const handleLocalOpenModal = (type) => {
    if (handleOpenModal) {
      handleOpenModal(type);
    } else {
      setModalType(type);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType(null);
    setFormData({ name: '', surname: '', email: '', password: '', profession: '', message: '' });
    setPhoneNumber('');
    setSelectedDate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'login') {
        const userData = await login(formData.email, formData.password);
        handleCloseModal();
        const savedPlan = localStorage.getItem('selectedPlan');
        if (savedPlan) {
          setSelectedPlan(JSON.parse(savedPlan));
          setTimeout(() => {
            setUpgradeModalOpen(true);
            localStorage.removeItem('selectedPlan');
          }, 500);
        }
        alertRef.current?.showAlert('success', 'Başarıyla giriş yaptınız!');
      }
    } catch (error) {
      alertRef.current?.showAlert('error', 'Giriş işlemi başarısız oldu.');
    }
  };

  const handlePlanUpgradeSuccess = (plan) => {
    alertRef.current?.showAlert('success', `${plan.name} planına başarıyla geçtiniz!`);
    setUpgradeModalOpen(false);
  };

  const handlePlanUpgradeError = (message) => {
    alertRef.current?.showAlert('error', message || 'Yükseltme başarısız oldu.');
    setUpgradeModalOpen(false);
  };

  const pageId = propPageId || urlPageId || 'home';

  const renderPage = () => {
    switch (pageId) {
      case 'home':
        return <Home selectedTab={selectedTab} onTabChange={handleTabChange} />;
      case 'about':
        return <About />;
      case 'account':
        return <Account handleOpenModal={handleLocalOpenModal} />;
      case 'suggest':
        return <Services handleOpenModal={handleLocalOpenModal} />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div>
      <Alerts ref={alertRef} />
      <SideMenu isDatabaseVisible={pageId === 'home' && selectedTab === 'database'} />
      <Container maxWidth="xl" sx={{ maxWidth: '1400px' }}>
        <Box sx={{ py: { xs: 6, sm: 7, md: 8 } }}>
          {renderPage()}
        </Box>
      </Container>
      <PlanUpgradeModal
        open={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        selectedPlan={selectedPlan}
        currentPlan={user?.plan}
        onSuccess={handlePlanUpgradeSuccess}
        onError={handlePlanUpgradeError}
      />
      <ModalManager
        open={modalOpen}
        modalType={modalType}
        onClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        phoneNumber={phoneNumber}
        handlePhoneChange={(e) => setPhoneNumber(e.target.value)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleOpenModal={handleLocalOpenModal}
      />
    </div>
  );
};

export default PageManager;
