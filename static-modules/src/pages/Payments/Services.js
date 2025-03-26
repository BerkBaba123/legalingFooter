// src/pages/Services.js
import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import Alerts from '../../components/Alerts';
import PlanUpgradeModal from '../../components/PlanUpgradeModal';
import { useNavigate } from 'react-router-dom';


const Services = ({ handleOpenModal }) => {
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
                  {plan.price === 0 ? 'Misafir Olarak Devam Et' : plan.type === 'Akademik' ? 'Kampüs Ağı ile Bağlan' : user ? 'Planı Seç' : 'Giriş Yap'}
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
                  {plan.price === 0 ? 'Misafir Olarak Devam Et' : plan.type === 'Akademik' ? 'Kampüs Ağı ile Bağlan' : user ? 'Planı Seç' : 'Giriş Yap'}
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

export default Services;
