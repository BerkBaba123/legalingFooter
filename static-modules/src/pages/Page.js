import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Tabs, Tab, ToggleButtonGroup, ToggleButton, styled, InputBase, Select, MenuItem, Button, TextField, useTheme, InputLabel, FormControl, Card, CardContent, CardActions, Grid, FormControlLabel, Switch, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import SideMenu from '../components/SideMenu';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../App';
import { getPlans } from '../services/api';
import CheckIcon from '@mui/icons-material/Check';
import PlanUpgradeModal from '../components/PlanUpgradeModal';
import Alerts from '../components/Alerts';
import ModalManager from '../components/ModalManager';
import { searchDictionary } from '../data/DictionaryDataBase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: 400,
  height: 50,
  backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
  borderRadius: '30px',
  padding: '4px',
  overflow: 'hidden',
  "& .MuiToggleButton-root": {
    width: "50%",
    height: '42px',
    border: "none",
    color: theme.palette.mode === "dark" ? "#FFFFFF" : "#080808",
    fontSize: '14px',
    fontWeight: 500,
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.mode === "dark" ? "#161719" : "#FFFFFF",
    borderRadius: 0, // Önce tüm köşeleri sıfırla
    "&:first-of-type": {
      borderTopLeftRadius: '30px',     // Sol tab için sadece sol kenarlar oval
      borderBottomLeftRadius: '30px',
      borderRight: theme.palette.mode === "dark" ? "1px solid #5D5D5D" : "1px solid #D1D1D1",
    },
    "&:last-of-type": {
      borderTopRightRadius: '30px',    // Sağ tab için sadece sağ kenarlar oval
      borderBottomRightRadius: '30px',
      borderLeft: theme.palette.mode === "dark" ? "1px solid #5D5D5D" : "1px solid #D1D1D1",
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#E8E8E8",
      color: theme.palette.mode === "dark" ? "#FFFFFF" : "#080808",
      "&:hover": {
        backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#E8E8E8",
      }
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "rgba(8, 8, 8, 0.1)" : "rgba(232, 232, 232, 0.5)",
    }
  }
}));

// ServicesContent bileşeni
const ServicesContent = ({ handleOpenModal }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const alertRef = useRef();

  const mockPlans = [
    {
      type: 'Misafir',
      name: 'Ücretsiz',
      description: "Legaling'i ilk kez ziyaret edenler için",
      price: 0,
      userCount: 1,
      searchQuota: 1,
      hasTranslations: true,
      hasLegalCategories: true,
      hasWordTypes: true,
      hasThemes: false,
      hasNotifications: false,
      canSuggestConcepts: false,
      hasExampleSentences: false,
      hasDescriptions: false,
      hasSearchHistory: false,
      hasSentenceDictionary: false,
      hasSynonymDictionary: false,
      hasPriorityAdditions: false,
      hasOfficeSettings: false
    },
    {
      type: 'Temel',
      name: 'Ücretsiz',
      description: "Sınırlı bir Legaling deneyiminden yararlanmak isteyen kullanıcılar için",
      price: 99,
      userCount: 1,
      searchQuota: 5,
      hasTranslations: true,
      hasLegalCategories: true,
      hasWordTypes: true,
      hasThemes: true,
      hasNotifications: true,
      canSuggestConcepts: true,
      hasExampleSentences: false,
      hasDescriptions: false,
      hasSearchHistory: false,
      hasSentenceDictionary: false,
      hasSynonymDictionary: false,
      hasPriorityAdditions: false,
      hasOfficeSettings: false
    },
    {
      type: 'Bireysel',
      name: '100₺ / aylık',
      description: "Legaling'in tüm ayrıcalıklarından sınırlı bir arama hakkı kapsamında faydalanmak isteyen tekil kullanıcılar için",
      price: 199,
      userCount: 1,
      searchQuota: 30,
      hasTranslations: true,
      hasLegalCategories: true,
      hasWordTypes: true,
      hasThemes: true,
      hasNotifications: true,
      canSuggestConcepts: true,
      hasExampleSentences: true,
      hasDescriptions: true,
      hasSearchHistory: true,
      hasSentenceDictionary: true,
      hasSynonymDictionary: true,
      hasPriorityAdditions: false,
      hasOfficeSettings: false
    },
    {
      type: 'Profesyonel',
      name: '900₺ / aylık',
      description: "En kapsamlı Legaling deneyiminden faydalanmak isteyen hukuk büroları, şirketlerin hukuk departmanları, tercüme ofisleri gibi kurumsal müşteriler için",
      price: 499,
      userCount: 5,
      searchQuota: -1,
      hasTranslations: true,
      hasLegalCategories: true,
      hasWordTypes: true,
      hasThemes: true,
      hasNotifications: true,
      canSuggestConcepts: true,
      hasExampleSentences: true,
      hasDescriptions: true,
      hasSearchHistory: true,
      hasSentenceDictionary: true,
      hasSynonymDictionary: true,
      hasPriorityAdditions: true,
      hasOfficeSettings: true
    },
    {
      type: 'Akademik',
      name: 'Teklif Al',
      description: "En kapsamlı Legaling deneyiminden yararlanmak isteyen üniversiteler için",
      price: 999,
      userCount: 'Kampüs',
      searchQuota: -1,
      hasTranslations: true,
      hasLegalCategories: true,
      hasWordTypes: true,
      hasThemes: true,
      hasNotifications: false,
      canSuggestConcepts: true,
      hasExampleSentences: true,
      hasDescriptions: true,
      hasSearchHistory: false,
      hasSentenceDictionary: true,
      hasSynonymDictionary: true,
      hasPriorityAdditions: true,
      hasOfficeSettings: false
    }
  ];

  useEffect(() => {
    try {
      setLoading(true);
      // Backend hazır olduğunda bu kısmı aktif edeceğiz
      // const response = await getPlans();
      // setPlans(response.data);
      setLoading(false);
    } catch (err) {
      setError(`Planlar yüklenirken bir hata oluştu: ${err.response?.data?.message || err.message}`);
      console.error('Error fetching plans:', err);
      setLoading(false);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderPlanFeatures = (plan) => {
    const staticFeatures = [
      { label: typeof plan.userCount === 'string' ? plan.userCount : `${plan.userCount} kullanıcı`, isBold: true },
      { label: plan.searchQuota === -1 ? 'Sınırsız arama' : `Günlük ${plan.searchQuota} arama hakkı` }
    ];

    const dynamicFeatures = [
      { label: 'Karşı dildeki karşılıklar', value: plan.hasTranslations },
      { label: 'Hukuk dalı kırılımları', value: plan.hasLegalCategories },
      { label: 'Kelime türleri ve çoğul kullanımlar', value: plan.hasWordTypes },
      { label: 'Farklı tema seçenekleri', value: plan.hasThemes },
      { label: 'Yeni eklenen kavramlar hakkında bildirim alma', value: plan.hasNotifications },
      { label: 'Kavram önerme', value: plan.canSuggestConcepts },
      { label: 'Örnek cümleler', value: plan.hasExampleSentences },
      { label: 'Açıklamalar', value: plan.hasDescriptions },
      { label: 'Arama geçmişi', value: plan.hasSearchHistory },
      { label: 'Cümle sözlüğü', value: plan.hasSentenceDictionary },
      { label: 'Eş anlamlı kavramlar sözlüğü', value: plan.hasSynonymDictionary },
      { label: 'Bulunmayan kavramların eklenmesinde öncelik', value: plan.hasPriorityAdditions },
      { label: 'Kişiselleştirilmiş ofis sayfası', value: plan.hasOfficeSettings }
    ];

    const allFeatures = [...staticFeatures, ...dynamicFeatures];

    return allFeatures.map((feature, index) => (
      <Box key={index}>
        <Typography
          sx={{
            fontSize: '14px',
            color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
            py: 1.5,
            fontWeight: feature.isBold ? 700 : 400
          }}
        >
          {index < 2 ? feature.label : (feature.value ? feature.label : '-')}
        </Typography>
        {index < allFeatures.length - 1 && (
          <Box
            sx={{
              height: '1px',
              backgroundColor: theme => theme.palette.mode === 'light' ? '#E8E8E8' : '#5D5D5D'
            }}
          />
        )}
      </Box>
    ));
  };

  const handlePlanSelect = (plan) => {
    if (!user) {
      // Kullanıcı giriş yapmamışsa, seçilen planı localStorage'a kaydet ve giriş modalını aç
      localStorage.setItem('selectedPlan', JSON.stringify(plan));
      handleOpenModal('login');
    } else {
      // Kullanıcı giriş yapmışsa, plan yükseltme modalını aç
      setSelectedPlan(plan);
      setUpgradeModalOpen(true);
    }
  };

  const handlePlanUpgradeSuccess = (plan) => {
    alertRef.current?.showAlert('success', `${plan.name} planına başarıyla geçiş yaptınız!`);
    setUpgradeModalOpen(false);
  };

  const handlePlanUpgradeError = (errorMessage) => {
    alertRef.current?.showAlert('error', errorMessage || 'Plan yükseltme işlemi başarısız oldu. Lütfen tekrar deneyin.');
    setUpgradeModalOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', color: 'error.main', py: 4 }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Alerts ref={alertRef} />
      <Typography 
        sx={{ 
          width: { xs: '100%', sm: '90%', md: '800px' },
          height: { xs: 'auto', sm: 'auto', md: '150px' },
          fontSize: { xs: '32px', sm: '45px', md: '60px' },
          fontWeight: 700,
          lineHeight: { xs: '120%', sm: '110%', md: '100%' },
          letterSpacing: '0%',
          color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
          mb: { xs: 3, sm: 4, md: 4 },
          whiteSpace: 'pre-line',
          textAlign: { xs: 'center', sm: 'center', md: 'left' }
        }}
      >
        {'Kullanım tercihinize\nuygun planı bulun'}
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', mb: 8, position: 'relative' }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .Mui-selected': {
              color: theme => theme.palette.mode === 'light' ? '#3E3E3E !important' : '#FFFFFF !important',
              fontWeight: 'bold',
            },
            '& .MuiTab-root': {
              fontSize: '16px',
              textTransform: 'none',
              color: theme => theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
              padding: '12px 30px'
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
              gap: '60px'
            }
          }}
        >
          <Tab label="Veri Tabanı" />
          <Tab label="Çeviri Robotu" />
        </Tabs>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: selectedTab === 0 ? '0%' : '50%',
            width: '50%',
            height: '2px',
            bgcolor: '#FFC300',
            transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </Box>

      {selectedTab === 0 && (
        <Box sx={{ 
          width: '100%', 
          px: { xs: 2, sm: 3, md: 0 },
          overflow: 'hidden'
        }}>
          <Typography 
            sx={{ 
              width: '100%',
              fontSize: { xs: '24px', sm: '32px', md: '55px' },
              fontWeight: 700,
              lineHeight: { xs: '120%', md: '100%' },
              letterSpacing: '0%',
              color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              mb: { xs: 2, sm: 3, md: 6 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Veri Tabanı Planları
          </Typography>
          <Typography 
            sx={{ 
              width: '100%',
              fontSize: { xs: '14px', sm: '16px', md: '20px' },
              fontWeight: 400,
              lineHeight: { xs: '140%', md: '100%' },
              letterSpacing: '0%',
              color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              whiteSpace: { xs: 'normal', md: 'pre-line' },
              mb: { xs: 4, sm: 5, md: 6 },
              textAlign: { xs: 'justify', md: 'left' },
              opacity: 0.8
            }}
          >
            {'Ücretsiz seçeneklerden dilediğiniz süre boyunca faydalanabilir veya\nkullanıcı profillerine göre şekillendirilmiş paketlerden yararlanabilirsiniz.'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: user ? 'center' : 'flex-start',
              width: '100%',
              gap: { xs: 3, sm: 4, md: '30px' },
              flexWrap: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {mockPlans
              .filter(plan => !user || (user && !['Misafir', 'Temel', 'Akademik'].includes(plan.type)))
              .map((plan) => (
              <Box
                key={plan.name}
                sx={{
                  width: { xs: '100%', sm: '80%', md: '247px' },
                  maxWidth: { xs: '400px', sm: '80%', md: '247px' },
                  minHeight: { xs: 'auto', md: '1053px' },
                  borderRadius: '10px',
                  backgroundColor: theme => theme.palette.mode === 'light' ? '#E9E9E9' : '#171717',
                  padding: { xs: '16px', sm: '20px', md: '24px' },
                  display: 'flex',
                  flexDirection: 'column',
                  margin: { xs: '0 auto', md: '0' },
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 2, md: '20px' },
                  mb: { xs: 2, md: 3 },
                  overflow: 'hidden',
                  height: { xs: 'auto', md: '220px' }
                }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '12px', md: '14px' },
                        fontWeight: 600,
                        color: '#FFC300',
                        mb: { xs: 0.5, md: 1 }
                      }}
                    >
                      {plan.type.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '18px', sm: '20px', md: '24px' },
                        fontWeight: 700,
                        color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                        mb: { xs: 1, md: 2 },
                        wordBreak: 'break-word'
                      }}
                    >
                      {plan.name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '13px', md: '14px' },
                      color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                      lineHeight: { xs: '1.5', md: '1.4' },
                      wordBreak: 'break-word',
                      height: { xs: 'auto', md: '120px' },
                      overflow: 'hidden'
                    }}
                  >
                    {plan.description}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => handlePlanSelect(plan)}
                  sx={{
                    width: '100%',
                    height: { xs: '48px', md: '42px' },
                    backgroundColor: '#FFC300',
                    color: '#000000',
                    border: 'none',
                    '&:hover': {
                      backgroundColor: '#e6b000'
                    },
                    mb: { xs: 2, md: 3 },
                    textTransform: 'none',
                    fontSize: { xs: '14px', md: '13px' },
                    fontWeight: 700,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    whiteSpace: 'nowrap',
                    '& .MuiButton-root': {
                      textTransform: 'none',
                    }
                  }}
                >
                  {plan.price === 0 ? 'Misafir Olarak Devam Et' : user ? 'Planı Seç' : 'Giriş Yap'}
                </Button>
                <Box sx={{ 
                  flex: 1,
                  overflow: 'hidden',
                  '& .MuiTypography-root': {
                    fontSize: { xs: '13px', md: '14px' },
                    py: { xs: 1, md: 1.5 },
                    wordBreak: 'break-word'
                  }
                }}>
                  {renderPlanFeatures(plan)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {selectedTab === 1 && (
        <Box sx={{ 
          width: '100%', 
          px: { xs: 2, sm: 3, md: 0 },
          overflow: 'hidden'
        }}>
          <Typography 
            sx={{ 
              width: '100%',
              fontSize: { xs: '24px', sm: '32px', md: '55px' },
              fontWeight: 700,
              lineHeight: { xs: '120%', md: '100%' },
              letterSpacing: '0%',
              color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              mb: { xs: 2, sm: 3, md: 6 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Çeviri Robotu Planları
          </Typography>
          <Typography 
            sx={{ 
              width: '100%',
              fontSize: { xs: '14px', sm: '16px', md: '20px' },
              fontWeight: 400,
              lineHeight: { xs: '140%', md: '100%' },
              letterSpacing: '0%',
              color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              whiteSpace: { xs: 'normal', md: 'pre-line' },
              mb: { xs: 4, sm: 5, md: 6 },
              textAlign: { xs: 'justify', md: 'left' },
              opacity: 0.8
            }}
          >
            {'Ücretsiz seçeneklerden dilediğiniz süre boyunca faydalanabilir veya\nkullanıcı profillerine göre şekillendirilmiş paketlerden yararlanabilirsiniz.'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: user ? 'center' : 'flex-start',
              width: '100%',
              gap: { xs: 3, sm: 4, md: '30px' },
              flexWrap: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {mockPlans
              .filter(plan => !user || (user && !['Misafir', 'Temel', 'Akademik'].includes(plan.type)))
              .map((plan) => (
              <Box
                key={plan.name}
                sx={{
                  width: { xs: '100%', sm: '80%', md: '247px' },
                  maxWidth: { xs: '400px', sm: '80%', md: '247px' },
                  minHeight: { xs: 'auto', md: '1053px' },
                  borderRadius: '10px',
                  backgroundColor: theme => theme.palette.mode === 'light' ? '#E9E9E9' : '#171717',
                  padding: { xs: '16px', sm: '20px', md: '24px' },
                  display: 'flex',
                  flexDirection: 'column',
                  margin: { xs: '0 auto', md: '0' },
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 2, md: '20px' },
                  mb: { xs: 2, md: 3 },
                  overflow: 'hidden',
                  height: { xs: 'auto', md: '220px' }
                }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '12px', md: '14px' },
                        fontWeight: 600,
                        color: '#FFC300',
                        mb: { xs: 0.5, md: 1 }
                      }}
                    >
                      {plan.type.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '18px', sm: '20px', md: '24px' },
                        fontWeight: 700,
                        color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                        mb: { xs: 1, md: 2 },
                        wordBreak: 'break-word'
                      }}
                    >
                      {plan.name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '13px', md: '14px' },
                      color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                      lineHeight: { xs: '1.5', md: '1.4' },
                      wordBreak: 'break-word',
                      height: { xs: 'auto', md: '120px' },
                      overflow: 'hidden'
                    }}
                  >
                    {plan.description}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => handlePlanSelect(plan)}
                  sx={{
                    width: '100%',
                    height: { xs: '48px', md: '42px' },
                    backgroundColor: '#FFC300',
                    color: '#000000',
                    border: 'none',
                    '&:hover': {
                      backgroundColor: '#e6b000'
                    },
                    mb: { xs: 2, md: 3 },
                    textTransform: 'none',
                    fontSize: { xs: '14px', md: '13px' },
                    fontWeight: 700,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    whiteSpace: 'nowrap',
                    '& .MuiButton-root': {
                      textTransform: 'none',
                    }
                  }}
                >
                  {plan.price === 0 ? 'Misafir Olarak Devam Et' : user ? 'Planı Seç' : 'Giriş Yap'}
                </Button>
                <Box sx={{ 
                  flex: 1,
                  overflow: 'hidden',
                  '& .MuiTypography-root': {
                    fontSize: { xs: '13px', md: '14px' },
                    py: { xs: 1, md: 1.5 },
                    wordBreak: 'break-word'
                  }
                }}>
                  {renderPlanFeatures(plan)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <PlanUpgradeModal
        open={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        selectedPlan={selectedPlan}
        currentPlan={user?.plan}
        onSuccess={handlePlanUpgradeSuccess}
        onError={handlePlanUpgradeError}
      />
    </Box>
  );
};

// HomeContent bileşeni
const HomeContent = ({ selectedTab, onTabChange }) => {
  const [searchType, setSearchType] = useState('concepts');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [inputText, setInputText] = useState('');
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    if (newValue !== null) {
      onTabChange(newValue);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleLanguageSwitch = () => {
    setIsReversed(!isReversed);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    if (text.length <= 150) {
      setInputText(text);
    }
  };

  const handleSendText = () => {
    // Send text işlemi buraya eklenecek
    console.log('Sending text:', inputText);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = searchDictionary(searchQuery, searchType);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const SendButton = () => (
    <Button
      onClick={handleSendText}
      disabled={!inputText}
      sx={{
        minWidth: 'auto',
        width: '45px',
        height: '45px',
        padding: '10px',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
          '& i': {
            color: '#FFC300'
          }
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: 'none'
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
          cursor: 'not-allowed',
          opacity: 0.5,
          border: 'none'
        }
      }}
    >
      <i 
        className="legaling-e815"
        style={{ 
          fontSize: '22px',
          opacity: inputText ? 1 : 0.5,
          transition: 'all 0.2s ease',
          filter: inputText ? 'none' : 'grayscale(100%)',
          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808'
        }}
      />
    </Button>
  );

  return (
    <Box>
      <Box sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row'
        },
        alignItems: {
          xs: 'flex-end',
          sm: 'center'
        },
        marginTop: '32px',
        marginBottom: {
          xs: '16px',
          sm: '0'
        },
        paddingLeft: {
          xs: '0',
          sm: '0',
          md: '120px'
        }
      }}>
        <Box sx={{
          display: 'flex',
          gap: '15px',
          marginBottom: {
            xs: '16px',
            sm: '0'
          },
          marginLeft: {
            xs: '0',
            sm: '0',
            md: '0'
          },
          marginRight: {
            xs: '20px',
            sm: '40px',
            md: '215px'
          },
          order: {
            xs: 1,
            sm: 2
          }
        }}>
          <Button
            sx={{
              width: '59px',
              height: '36px',
              padding: '8px 24px',
              borderRadius: '15px',
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#E8E8E8',
              '&:hover': {
                backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#E8E8E8',
              },
              '&:active': {
                backgroundColor: '#FFC300',
              }
            }}
          />
          <Button
            sx={{
              minWidth: '30px',
              width: '30px',
              height: '30px',
              padding: 0,
              border: theme => theme.palette.mode === 'dark' ? '2px solid #FFFFFF' : '2px solid #080808',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'transparent'
              },
              '&:active': {
                backgroundColor: '#FFC300',
                border: '2px solid #FFC300'
              }
            }}
          >
            <Box
              component="img"
              src="/assets/legaling_icon/info.svg"
              alt="Info"
              sx={{ 
                width: '20px',
                height: '20px',
                filter: theme => theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0) invert(0)'
              }}
            />
          </Button>
        </Box>
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          alignItems: {
            xs: 'center',
            sm: 'center'
          },
          justifyContent: {
            xs: 'center',
            sm: 'flex-start'
          },
          marginLeft: {
            xs: '0',
            sm: '0',
            md: '0'
          },
          position: 'relative',
          gap: {
            xs: '15px',
            sm: '20px'
          },
          order: {
            xs: 2,
            sm: 1
          },
          paddingLeft: {
            xs: '0',
            sm: '0',
            md: '0'
          }
        }}>
          <StyledToggleButtonGroup
            value={selectedTab}
            exclusive
            onChange={handleTabChange}
            aria-label="platform"
          >
            <ToggleButton value="database">
              Veri Tabanı
            </ToggleButton>
            <ToggleButton value="translation">
              Çeviri Robotu
            </ToggleButton>
          </StyledToggleButtonGroup>
          <Box
            component="img"
            src={selectedTab === 'database' ? "/assets/betaFrame 62.png" : "/assets/sparkles-svgrepo-com 1.png"}
            alt={selectedTab === 'database' ? "Beta" : "Sparkles"}
            sx={{
              width: {
                xs: selectedTab === 'database' ? '42px' : '18px',
                sm: selectedTab === 'database' ? '52px' : '22px'
              },
              height: {
                xs: selectedTab === 'database' ? '30px' : '18px',
                sm: selectedTab === 'database' ? '37px' : '22px'
              },
              position: {
                xs: 'absolute',
                sm: 'relative'
              },
              top: {
                xs: '-25px',
                sm: 'auto'
              },
              right: {
                xs: '0',
                sm: 'auto'
              },
              marginLeft: {
                xs: '0',
                sm: selectedTab === 'database' ? '-20px' : '-30px'
              },
              marginTop: {
                xs: '0',
                sm: selectedTab === 'database' ? '-51px' : '-25px'
              }
            }}
          />
        </Box>
      </Box>
      {selectedTab === 'database' && (
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '90%',
              md: '1060px'
            },
            height: 'auto',
            minHeight: {
              xs: '220px',
              sm: '250px',
              md: '269px'
            },
            padding: {
              xs: '40px 16px',
              sm: '60px 30px',
              md: '80px 45px 70px 45px'
            },
            gap: '20px',
            borderRadius: '15px',
            backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
            margin: '0 auto',
            marginTop: '20px',
            position: 'relative'
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: {
                xs: '20px',
                sm: '22px',
                md: '24px'
              },
              lineHeight: '100%',
              letterSpacing: '0%',
              color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
              marginBottom: '20px'
            }}
          >
            Legaling'de Ara
          </Typography>
          <Box
            sx={{
              width: '100%',
              borderBottom: theme => 
                theme.palette.mode === 'dark' 
                  ? '1px solid #FFFFFF' 
                  : '1px solid #080808',
              marginBottom: '20px'
            }}
          />
          <Box sx={{ 
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            gap: {
              xs: '0',
              md: '0'
            }
          }}>
            <InputBase
              placeholder="Profesyoneller için, profesyoneller tarafından..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{
                width: {
                  xs: '100%',
                  md: '646.85px'
                },
                height: {
                  xs: '42px',
                  sm: '45px',
                  md: '50px'
                },
                backgroundColor: '#E8E8E8',
                borderRadius: {
                  xs: '10px 10px 0 0',
                  md: '15px 0 0 15px'
                },
                border: {
                  xs: '1px solid #5D5D5D',
                  md: 'none'
                },
                borderBottom: {
                  xs: '1px solid #5D5D5D',
                  md: 'none'
                },
                borderRight: {
                  xs: 'none',
                  md: '1px solid #D1D1D1'
                },
                paddingLeft: '15px',
                paddingRight: '15px',
                '& .MuiInputBase-input': {
                  fontSize: {
                    xs: '14px',
                    sm: '16px',
                    md: '18px'
                  },
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#161719'
                },
                '&::placeholder': {
                  color: '#161719',
                  opacity: 1,
                  fontSize: {
                    xs: '14px',
                    sm: '16px',
                    md: '18px'
                  },
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle'
                }
              }}
            />
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row',
              gap: {
                xs: '0',
                md: '0'
              },
              width: {
                xs: '100%',
                md: 'auto'
              }
            }}>
              <Select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="homepage-select"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: '171.15px !important',
                      marginTop: '4px !important',
                      backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#E8E8E8',
                      borderRadius: '10px !important'
                    }
                  }
                }}
                IconComponent={() => (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'absolute',
                    right: '10px',
                    gap: '2px',
                    pointerEvents: 'none'
                  }}>
                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none">
                      <path d="M7 3.5L4 0.5L1 3.5" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none">
                      <path d="M1 0.5L4 3.5L7 0.5" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Box>
                )}
                sx={{
                  width: {
                    xs: '50%',
                    md: '171.15px'
                  },
                  height: {
                    xs: '42px',
                    sm: '45px',
                    md: '50px'
                  },
                  backgroundColor: '#E8E8E8',
                  borderRadius: {
                    xs: '0 0 0 10px',
                    md: '0'
                  },
                  border: {
                    xs: '1px solid #5D5D5D',
                    md: 'none'
                  },
                  borderTop: {
                    xs: 'none',
                    md: 'none'
                  },
                  borderRight: {
                    xs: '1px solid #5D5D5D',
                    md: '1px solid #000000'
                  },
                  padding: {
                    xs: '10px 15px',
                    sm: '12px 18px',
                    md: '14px 20px'
                  },
                  '& .MuiSelect-select': {
                    padding: '0',
                    fontSize: {
                      xs: '14px',
                      sm: '15px',
                      md: '16px'
                    },
                    fontWeight: 400,
                    color: '#161719'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiMenuItem-root': {
                    '&.Mui-selected': {
                      backgroundColor: '#FFC300 !important'
                    },
                    '&:hover': {
                      backgroundColor: '#FFC300'
                    }
                  }
                }}
              >
                <MenuItem value="concepts">Kavramlarda</MenuItem>
                <MenuItem value="sentences">Cümlelerde</MenuItem>
              </Select>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{
                  width: {
                    xs: '50%',
                    md: '152px'
                  },
                  height: {
                    xs: '42px',
                    sm: '45px',
                    md: '50px'
                  },
                  gap: '10px',
                  padding: {
                    xs: '10px 20px',
                    sm: '12px 30px',
                    md: '14px 45px'
                  },
                  borderRadius: {
                    xs: '0 0 10px 0',
                    md: '0 15px 15px 0'
                  },
                  border: {
                    xs: '1px solid #5D5D5D',
                    md: 'none'
                  },
                  borderTop: {
                    xs: 'none',
                    md: 'none'
                  },
                  borderLeft: {
                    xs: 'none',
                    md: 'none'
                  },
                  backgroundColor: '#ECBC00',
                  color: '#000000',
                  textTransform: 'none',
                  fontSize: {
                    xs: '14px',
                    sm: '15px',
                    md: '16px'
                  },
                  fontWeight: 400,
                  '&:hover': {
                    backgroundColor: '#D4A900'
                  },
                  boxShadow: 'none'
                }}
              >
                {isSearching ? <CircularProgress size={24} color="inherit" /> : 'Ara'}
              </Button>
            </Box>
          </Box>

          {/* Arama Sonuçları */}
          {searchResults.length > 0 && (
            <Box sx={{ mt: 4 }}>
              {/* Doğrudan Karşılıklar Tablosu */}
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: '10px',
                  backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFC300',
                    mb: 2,
                    fontSize: '18px',
                    fontWeight: 600
                  }}
                >
                  "{searchQuery}" Kavramının İngilizce-Türkçe Sözlükteki Karşılıkları
                </Typography>
                
                {/* Desktop Table View */}
                <Box sx={{ 
                  display: { 
                    xs: 'none', 
                    sm: 'block' 
                  }
                }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '5%'
                        }}>#</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Kavram</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '10%'
                        }}>Alan</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Karşılık</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '30%'
                        }}>Cümle</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '25%'
                        }}>Açıklama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults
                        .filter(result => result.tr.toLowerCase() === searchQuery.toLowerCase() || 
                                        result.en.toLowerCase() === searchQuery.toLowerCase())
                        .map((result, index) => (
                          <tr key={result.id}>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{index + 1}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.tr}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.category}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.en}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.examples && result.examples.length > 0 ? result.examples[0] : '-'}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.description || '-'}</td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>

                {/* Mobile Card View */}
                <Box sx={{ 
                  display: { 
                    xs: 'flex', 
                    sm: 'none' 
                  }, 
                  flexDirection: 'column', 
                  gap: 2 
                }}>
                  {searchResults
                    .filter(result => result.tr.toLowerCase() === searchQuery.toLowerCase() || 
                                    result.en.toLowerCase() === searchQuery.toLowerCase())
                    .map((result, index) => (
                      <Box
                        key={result.id}
                        sx={{
                          p: 2,
                          borderRadius: '10px',
                          backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          mb: 2
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ color: '#FFC300', fontWeight: 600, mb: 2 }}>
                          #{index + 1}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Kavram:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.tr}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Alan:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.category}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Karşılık:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.en}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Cümle:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.examples && result.examples.length > 0 ? result.examples[0] : '-'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Açıklama:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.description || '-'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>

              {/* İçinde Geçtiği Kavramlar Tablosu */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: '10px',
                  backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFC300',
                    mb: 2,
                    fontSize: '18px',
                    fontWeight: 600
                  }}
                >
                  "{searchQuery}" Kavramının İngilizce-Türkçe Sözlükte İçinde Geçtiği Kavramlar
                </Typography>

                {/* Desktop Table View */}
                <Box sx={{ 
                  display: { 
                    xs: 'none', 
                    sm: 'block' 
                  }
                }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '5%'
                        }}>#</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Kavram</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '10%'
                        }}>Alan</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '15%'
                        }}>Karşılık</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '30%'
                        }}>Cümle</th>
                        <th style={{
                          padding: '12px',
                          backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                          border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`,
                          textAlign: 'left',
                          width: '25%'
                        }}>Açıklama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults
                        .filter(result => (result.tr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                         result.en.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                         result.tr.toLowerCase() !== searchQuery.toLowerCase() &&
                                         result.en.toLowerCase() !== searchQuery.toLowerCase())
                        .map((result, index) => (
                          <tr key={result.id}>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{index + 1}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.tr}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.category}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.en}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.examples && result.examples.length > 0 ? result.examples[0] : '-'}</td>
                            <td style={{
                              padding: '12px',
                              border: `1px solid ${theme.palette.mode === 'dark' ? '#5D5D5D' : '#E8E8E8'}`
                            }}>{result.description || '-'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Box>

                {/* Mobile Card View */}
                <Box sx={{ 
                  display: { 
                    xs: 'flex', 
                    sm: 'none' 
                  }, 
                  flexDirection: 'column', 
                  gap: 2 
                }}>
                  {searchResults
                    .filter(result => (result.tr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     result.en.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                     result.tr.toLowerCase() !== searchQuery.toLowerCase() &&
                                     result.en.toLowerCase() !== searchQuery.toLowerCase())
                    .map((result, index) => (
                      <Box
                        key={result.id}
                        sx={{
                          p: 2,
                          borderRadius: '10px',
                          backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          mb: 2
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ color: '#FFC300', fontWeight: 600, mb: 2 }}>
                          #{index + 1}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Kavram:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.tr}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Alan:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.category}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Karşılık:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.en}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Cümle:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.examples && result.examples.length > 0 ? result.examples[0] : '-'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#999' : '#666',
                              display: 'block',
                              mb: 0.5,
                              fontWeight: 500
                            }}>
                              Açıklama:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme => theme.palette.mode === 'dark' ? '#FFF' : '#000',
                              fontWeight: 400
                            }}>
                              {result.description || '-'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {selectedTab === 'translation' && (
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '90%',
              md: '1060px'
            },
            height: {
              xs: '600px',
              sm: '550px',
              md: '478px'
            },
            borderRadius: '15px',
            padding: {
              xs: '10px',
              sm: '12px 0',
              md: '15px 0'
            },
            backgroundColor: theme => theme.palette.mode === 'dark' ? '#161719' : '#FFFFFF',
            margin: '0 auto',
            marginTop: '20px',
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: {
                xs: '60px',
                sm: '70px',
                md: '80px'
              },
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: '#5D5D5D',
              zIndex: 1
            }}
          />
          <Button
            onClick={handleLanguageSwitch}
            sx={{
              position: 'absolute',
              right: '50%',
              top: {
                xs: '15px',
                sm: '18px',
                md: '20px'
              },
              transform: 'translate(50%, 0)',
              minWidth: {
                xs: '40px',
                sm: '44px',
                md: '48px'
              },
              width: {
                xs: '40px',
                sm: '44px',
                md: '48px'
              },
              height: {
                xs: '40px',
                sm: '44px',
                md: '48px'
              },
              padding: 0,
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '50%',
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'transparent',
                '& .MuiSvgIcon-root': {
                  color: '#FFC300'
                }
              }
            }}
          >
            <SwapHorizIcon 
              sx={{ 
                fontSize: '44px',
                color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#080808',
                transition: 'color 0.2s ease'
              }}
            />
          </Button>
          {/* Dil Bölümleri */}
          {isReversed ? (
            <>
              {/* Sol Bölüm - Aktif Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: {
                      xs: '60px',
                      sm: '70px',
                      md: '80px'
                    },
                    bottom: {
                      xs: '15px',
                      sm: '18px',
                      md: '20px'
                    },
                    width: '1px',
                    backgroundColor: '#5D5D5D'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  İngilizce
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="for professionals by professionals..."
                  variant="standard"
                  inputProps={{
                    maxLength: 150
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      '&:before, &:after': {
                        display: 'none'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0,
                      '&::placeholder': {
                        color: '#6B7280',
                        opacity: 1
                      }
                    }
                  }}
                />
                <Box sx={{ 
                  position: 'absolute',
                  bottom: {
                    xs: '10px',
                    sm: '12px',
                    md: '15px'
                  },
                  left: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  right: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        sm: '13px',
                        md: '14px'
                      },
                      color: '#6B7280'
                    }}
                  >
                    {inputText.length}/150
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={!inputText.trim()}
                    sx={{
                      minWidth: "auto",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#1A1A1A",
                      "&:hover": {
                        backgroundColor: "#2A2A2A",
                        "& .MuiSvgIcon-root": {
                          color: "#FFC300"
                        }
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(26, 26, 26, 0.3)",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                  >
                    <SendIcon sx={{ 
                      fontSize: "20px",
                      color: "#fff",
                      transition: "color 0.2s ease"
                    }} />
                  </Button>
                </Box>
              </Box>
              {/* Sağ Bölüm - Disabled Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  paddingLeft: {
                    xs: '25px',
                    sm: '30px',
                    md: '40px'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  Türkçe
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  placeholder="profesyoneller için profesyoneller tarafından..."
                  variant="standard"
                  disabled
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      backgroundColor: 'transparent',
                      '&:before, &:after': {
                        display: 'none'
                      },
                      '&.Mui-disabled': {
                        color: '#6B7280',
                        WebkitTextFillColor: '#6B7280'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0
                    }
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              {/* Sol Bölüm - Aktif Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: {
                      xs: '60px',
                      sm: '70px',
                      md: '80px'
                    },
                    bottom: {
                      xs: '15px',
                      sm: '18px',
                      md: '20px'
                    },
                    width: '1px',
                    backgroundColor: '#5D5D5D'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  Türkçe
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="profesyoneller için profesyoneller tarafından..."
                  variant="standard"
                  inputProps={{
                    maxLength: 150
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      '&:before, &:after': {
                        display: 'none'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0,
                      '&::placeholder': {
                        color: '#6B7280',
                        opacity: 1
                      }
                    }
                  }}
                />
                <Box sx={{ 
                  position: 'absolute',
                  bottom: {
                    xs: '10px',
                    sm: '12px',
                    md: '15px'
                  },
                  left: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  right: {
                    xs: '15px',
                    sm: '18px',
                    md: '20px'
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        sm: '13px',
                        md: '14px'
                      },
                      color: '#6B7280'
                    }}
                  >
                    {inputText.length}/150
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={!inputText.trim()}
                    sx={{
                      minWidth: "auto",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#1A1A1A",
                      "&:hover": {
                        backgroundColor: "#2A2A2A",
                        "& .MuiSvgIcon-root": {
                          color: "#FFC300"
                        }
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "rgba(26, 26, 26, 0.3)",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                  >
                    <SendIcon sx={{ 
                      fontSize: "20px",
                      color: "#fff",
                      transition: "color 0.2s ease"
                    }} />
                  </Button>
                </Box>
              </Box>
              {/* Sağ Bölüm - Disabled Metin Kutusu */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: {
                    xs: '0 15px 15px',
                    sm: '0 18px 18px',
                    md: '0 20px 20px'
                  },
                  paddingLeft: {
                    xs: '25px',
                    sm: '30px',
                    md: '40px'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px'
                    },
                    fontWeight: 500,
                    color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                    marginBottom: '10px',
                    padding: {
                      xs: '15px 0 20px',
                      sm: '18px 0 25px',
                      md: '20px 0 30px'
                    },
                    width: '100%'
                  }}
                >
                  İngilizce
                </Typography>
                <TextField
                  multiline
                  rows={12}
                  placeholder="for professionals by professionals..."
                  variant="standard"
                  disabled
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      padding: 0,
                      fontSize: {
                        xs: '14px',
                        sm: '15px',
                        md: '16px'
                      },
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
                      '&:before, &:after': {
                        display: 'none'
                      }
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      padding: 0
                    }
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

// AccountContent bileşeni
const AccountContent = ({ handleOpenModal }) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [selectedTab, setSelectedTab] = useState('account-info');
  const { isDarkMode, toggleTheme } = useThemeContext();

  useEffect(() => {
    if (!user) {
      handleOpenModal('login');
      navigate('/');
    }
  }, [user, handleOpenModal, navigate]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getMenuOptions = () => {
    switch (selectedTab) {
      case 'membership':
        return [
          'Üyelik Planı',
          'Fatura Bilgileri',
          'Kartlarımı Yönet',
          'Geçmiş Ödemeler'
        ];
      case 'leaderboard':
        return [];
      case 'account-info':
      default:
        return [
          'Kullanıcı Bilgileri',
          'Hesabı Yükselt',
          'Şifreyi Güncelle',
          'E-Posta Tercihleri',
          'Hesabı Sil'
        ];
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1060px', margin: '0 auto' }}>
      <Typography 
        sx={{ 
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '100%',
          letterSpacing: '0%',
          verticalAlign: 'middle',
          color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
          mb: 6
        }}
      >
        Hesabım
      </Typography>

      {/* Segmented Control */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
        <Box sx={{ width: '550px', height: '32px', display: 'flex' }}>
          <Typography
            onClick={() => setSelectedTab('account-info')}
            sx={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 500,
              color: selectedTab === 'account-info' ? '#FFC300' : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              cursor: 'pointer',
              borderBottom: selectedTab === 'account-info' ? '2px solid #FFC300' : 'none',
              paddingBottom: '8px',
              textAlign: 'center'
            }}
          >
            Hesap Bilgileri
          </Typography>
          <Typography
            onClick={() => setSelectedTab('membership')}
            sx={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 500,
              color: selectedTab === 'membership' ? '#FFC300' : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              cursor: 'pointer',
              borderBottom: selectedTab === 'membership' ? '2px solid #FFC300' : 'none',
              paddingBottom: '8px',
              textAlign: 'center'
            }}
          >
            Üyelik ve Ödeme
          </Typography>
          <Typography
            onClick={() => setSelectedTab('leaderboard')}
            sx={{
              flex: 1,
              fontSize: '14px',
              fontWeight: 500,
              color: selectedTab === 'leaderboard' ? '#FFC300' : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
              cursor: 'pointer',
              borderBottom: selectedTab === 'leaderboard' ? '2px solid #FFC300' : 'none',
              paddingBottom: '8px',
              textAlign: 'center'
            }}
          >
            Liderlik Tablosu
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '24px' }}>
        {/* Sol Kart */}
        <Box
          sx={{
            width: 337,
            height: 435,
            backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
            borderRadius: '30px',
            paddingTop: '10px',
            paddingRight: '30px',
            paddingBottom: '10px',
            paddingLeft: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box 
            sx={{ 
              width: '277px',
              height: '100px',
              paddingTop: '20px',
              paddingBottom: '20px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              borderBottom: theme => `1px solid ${theme.palette.mode === 'light' ? '#E8E8E8' : '#5D5D5D'}`
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: theme => theme.palette.mode === 'light' ? '#F5F5F5' : '#2A2A2A'
              }}
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF'
                  }}
                >
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF'
                }}
              >
                {user?.name || 'Kullanıcı'} {user?.surname || 'Soyadı'}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: theme => theme.palette.mode === 'light' ? '#6B7280' : '#6B7280'
                }}
              >
                {user?.profession || 'Meslek'}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '142px',
              height: '315px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
          >
            {getMenuOptions().map((option, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  textDecoration: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationOffset: '0%',
                  textDecorationThickness: '0%',
                  color: option === 'Hesabı Yükselt' 
                    ? '#FFC300' 
                    : option === 'Hesabı Sil'
                    ? '#FF0000'
                    : theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                  cursor: 'pointer',
                  '&:hover': {
                    color: option === 'Hesabı Yükselt' 
                      ? '#FFC300' 
                      : option === 'Hesabı Sil'
                      ? '#FF0000'
                      : '#FFC300'
                  }
                }}
              >
                {option}
              </Typography>
            ))}
          </Box>
        </Box>
        {/* Sağ Kart */}
        <Box
          sx={{
            width: '798px',
            height: '435px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '10px 30px',
            borderRadius: '30px',
            backgroundColor: theme => theme.palette.mode === 'light' ? '#FFFFFF' : '#161719',
            position: 'relative'
          }}
        >
          {/* Tema değiştirme butonu */}
          <Box sx={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Typography
              sx={{
                fontSize: '14px',
                color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
                fontWeight: 500
              }}
            >
              Karanlık Mod
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#facc15",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#facc15",
                    },
                  }}
                />
              }
              label=""
              sx={{
                m: 0,
                '& .MuiFormControlLabel-label': {
                  display: 'none'
                }
              }}
            />
          </Box>
          
          {/* Sağ kartın içeriği buraya gelecek */}
        </Box>
      </Box>

      {/* Çıkış Yap butonu */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          mt: 3,
          ml: 3,
          padding: '5px 10px',
          '&:hover': {
            '& .logout-text': {
              color: '#FF4444'
            },
            '& .logout-icon': {
              color: '#FF4444'
            }
          }
        }}
        onClick={handleLogout}
      >
        <Typography
          className="logout-text"
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '100%',
            letterSpacing: '0%',
            verticalAlign: 'middle',
            color: theme => theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
            transition: 'color 0.2s ease'
          }}
        >
          Çıkış Yap
        </Typography>
        <LogoutIcon 
          className="logout-icon"
          sx={{ 
            fontSize: '24px',
            color: theme.palette.mode === 'light' ? '#3E3E3E' : '#FFFFFF',
            transition: 'color 0.2s ease'
          }}
        />
      </Box>
    </Box>
  );
};

// Sayfa içeriklerini burada tanımlıyoruz
const pageConfigs = {
  home: {
    title: 'Anasayfa',
    component: HomeContent
  },
  about: {
    title: 'Hakkımızda',
    component: () => (
      <Box>
        <Typography
          sx={{
            fontSize: '55px',
            fontWeight: 700,
            color: '#ECBC00',
            marginBottom: '40px',
            textAlign: 'center',
            width: '100%'
          }}
        >
          Hakkımızda
        </Typography>
        <Box sx={{ 
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <p style={{
            lineHeight: '1.8',
            fontWeight: 300,
            fontSize: '16px',
            marginBottom: '32px',
            textAlign: 'justify',
            color: 'inherit'
          }}>
            Legaling, Temmuz 2020 tarihinde iki temel vizyonla pazara çıkışını gerçekleştiren Türkiye'nin ilk İngilizce-Türkçe, Türkçe-İngilizce hukuk terimleri veri tabanıdır.
          </p>
          <p style={{
            lineHeight: '1.8',
            fontWeight: 300,
            fontSize: '16px',
            marginBottom: '32px',
            textAlign: 'justify',
            color: 'inherit'
          }}>
            Legaling'in birincil vizyonu, hukuk terimleri özelinde güvenilir ve kapsayıcı bir kaynak yaratarak genel sözlüklerin sebep olduğu kavram karmaşasını ve bilgi kirliliğini ortadan kaldırmaktır. Bu doğrultuda, İngilizce-Türkçe ve Türkçe-İngilizce hukuk terimleri tercümesinde "profesyoneller için, profesyoneller tarafından" hizmet verme idealiyle yola çıkan Legaling, 25 kişilik hukukçu araştırma ekibi ve teknik ekibiyle birlikte hukuk alanında yaşanan çeviri problemlerine profesyonel bir çözüm sunmaktadır.
          </p>
          <p style={{
            lineHeight: '1.8',
            fontWeight: 300,
            fontSize: '16px',
            marginBottom: '32px',
            textAlign: 'justify',
            color: 'inherit'
          }}>
            Hukuk ve dil arasındaki yakın ilişki göz önünde bulundurulduğunda, hukuk alanında hayata geçirilecek ileri derece teknolojik girişimlerin öncelikle dil engelini aşması gerekmektedir. Bu kapsamda, Legaling'in ikincil vizyonu İngilizce-Türkçe hukuk terimlerinin etiketleme çalışmasını gerçekleştirmektir. Nitekim, küreselden yerel hukuk ekosistemine nüfuz etmek isteyen hukuk teknolojileri ile yerelden küresele açılmak isteyen hukuk teknolojilerine süreç boyunca gerekli altyapıyı sağlamak ve iki pazar arasında bir köprü görevi görmek amaçlanmaktadır.
          </p>
          <p style={{
            lineHeight: '1.8',
            fontWeight: 300,
            fontSize: '16px',
            marginBottom: '32px',
            textAlign: 'justify',
            color: 'inherit'
          }}>
            Cümle sözlüğü, hukuk dalı kırılımları, eş anlamlı kelimeler, çoğul kullanımlar, açıklamalar ve örnek cümlelerle, hukuk alanında yaşanan çeviri problemlerinin önüne geçilmesini mümkün kılan veri tabanına, her hafta 700-800 adet kavram çifti eklenmektedir. Veri tabanında yapılan zenginleştirmeler, kullanıcılar tarafından aratılıp karşılığı bulunamadığı tespit edilen kavramlara öncelik verilerek yapılmaktadır. Her bir kavram dört farklı hukukçunun denetiminden geçtikten sonra veri tabanında yer edinmektedir.
          </p>
          <p style={{
            lineHeight: '1.8',
            fontWeight: 300,
            fontSize: '16px',
            marginBottom: '32px',
            textAlign: 'justify',
            color: 'inherit'
          }}>
            Hukuk alanındaki bu büyük ihtiyacı Legaling ailesi olarak karşılamaktan mutluluk duyuyoruz. Çok değerli hukukçuların Legaling ile ortaya koyacağı çok önemli işlerin olacağını biliyor ve Türk hukuk dünyasında bir fark yaratacak bu zorlu süreçte bize güvendiğiniz ve bizimle beraber yürüdüğünüz için teşekkür ediyoruz.
          </p>
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 4,
            textAlign: 'left',
            fontStyle: 'italic',
            maxWidth: '800px',
            margin: '0 auto',
            display: 'block'
          }}
        >
          Legaling Ailesi
        </Typography>
      </Box>
    )
  },
  account: {
    title: 'Hesabım',
    component: AccountContent
  },
  dictionary: {
    title: 'Sözlük',
    component: () => (
      <Box>
        <Typography paragraph>
          Kapsamlı hukuk terimleri sözlüğümüze hoş geldiniz.
        </Typography>
      </Box>
    )
  },
  suggest: {
    title: '',
    component: ({ handleOpenModal }) => <ServicesContent handleOpenModal={handleOpenModal} />
  },
  chatbot: {
    title: 'ChatBot',
    component: () => (
      <Box>
        <Typography paragraph>
          Yapay zeka destekli hukuk asistanımız size yardımcı olmaya hazır.
        </Typography>
      </Box>
    )
  }
};

const Page = ({ pageId: propPageId }) => {
  const { pageId: urlPageId } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('database');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    message: '',
    profession: ''
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const { user, login } = useAuth();
  const alertRef = useRef();
  const theme = useTheme();

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType(null);
    setFormData({
      name: '',
      surname: '',
      email: '',
      password: '',
      message: '',
      profession: ''
    });
    setPhoneNumber('');
    setSelectedDate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalType === 'login') {
        // Giriş işlemi
        const userData = await login(formData.email, formData.password);
        
        // Başarılı giriş sonrası
        handleCloseModal();
        
        // Eğer localStorage'da bekleyen bir plan varsa, plan yükseltme modalını aç
        const savedPlan = localStorage.getItem('selectedPlan');
        if (savedPlan) {
          const plan = JSON.parse(savedPlan);
          setSelectedPlan(plan);
          setTimeout(() => {
            setUpgradeModalOpen(true);
            localStorage.removeItem('selectedPlan');
          }, 500);
        }
        
        // Başarılı giriş bildirimi
        alertRef.current?.showAlert('success', 'Başarıyla giriş yaptınız!');
      } else if (modalType === 'signup') {
        // Kayıt işlemi
        // ... signup logic ...
      } else if (modalType === 'contact') {
        // İletişim formu
        // ... contact form logic ...
      }
    } catch (error) {
      // Hata mesajını Alerts bileşeni ile göster
      alertRef.current?.showAlert('error', 'Geçersiz e-posta veya şifre');
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const currentPageId = propPageId || urlPageId || 'home';
        const config = pageConfigs[currentPageId];
        
        if (!config) {
          throw new Error('Sayfa bulunamadı');
        }

        const mockData = {
          title: config.title,
          content: config.component,
          lastUpdated: new Date().toISOString()
        };

        setPageData(mockData);
        setError(null);
      } catch (err) {
        setError(err.message);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [propPageId, urlPageId, navigate]);

  const currentPageId = propPageId || urlPageId || 'home';

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const handlePlanSelect = (plan) => {
    if (!user) {
      // Kullanıcı giriş yapmamışsa, seçilen planı localStorage'a kaydet ve giriş modalını aç
      localStorage.setItem('selectedPlan', JSON.stringify(plan));
      handleOpenModal('login');
    } else {
      // Kullanıcı giriş yapmışsa, plan yükseltme modalını aç
      setSelectedPlan(plan);
      setUpgradeModalOpen(true);
    }
  };

  const handlePlanUpgradeSuccess = (plan) => {
    alertRef.current?.showAlert('success', `${plan.name} planına başarıyla geçiş yaptınız!`);
    setUpgradeModalOpen(false);
  };

  const handlePlanUpgradeError = (errorMessage) => {
    alertRef.current?.showAlert('error', errorMessage || 'Plan yükseltme işlemi başarısız oldu. Lütfen tekrar deneyin.');
    setUpgradeModalOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const pageComponent = currentPageId === 'home' 
    ? <HomeContent selectedTab={selectedTab} onTabChange={handleTabChange} />
    : pageData?.content ? <pageData.content handleOpenModal={handleOpenModal} /> : null;

  return (
    <div>
      <Alerts ref={alertRef} />
      <SideMenu isDatabaseVisible={currentPageId === 'home' && selectedTab === 'database'} />
      <Container maxWidth="xl" sx={{ maxWidth: '1400px' }}>
        <Box sx={{ py: 4 }}>
          {pageComponent}
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
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
};

export default Page; 