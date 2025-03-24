import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const PlanUpgradeModal = ({ open, onClose, selectedPlan, currentPlan, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { upgradePlan } = useAuth();

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setError(null);

      // Plan ID'sini kontrol et ve düzenle
      const planId = selectedPlan?.type?.toLowerCase().replace(/[İ]/g, 'i') || selectedPlan?.name?.toLowerCase().replace(/[İ]/g, 'i');
      if (!planId) {
        throw new Error('Geçersiz plan seçimi');
      }

      // Plan yükseltme işlemini gerçekleştir
      const updatedPlan = await upgradePlan(planId);

      // Başarılı mesajını göster ve modalı kapat
      onSuccess?.(updatedPlan);
      onClose();
    } catch (err) {
      const errorMessage = err.message || 'Plan yükseltme işlemi başarısız oldu.';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPlanChangeType = () => {
    const currentPrice = currentPlan?.price || 0;
    const newPrice = selectedPlan?.price || 0;

    if (newPrice > currentPrice) return 'upgrade';
    if (newPrice < currentPrice) return 'downgrade';
    return 'switch';
  };

  const planChangeType = getPlanChangeType();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {planChangeType === 'upgrade' ? 'Planınızı Yükseltin' :
         planChangeType === 'downgrade' ? 'Planınızı Değiştirin' :
         'Plan Değişikliği'}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Mevcut Plan: {currentPlan?.name || 'Misafir'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Yeni Plan: {selectedPlan?.name}
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          {planChangeType === 'upgrade' ? (
            `${selectedPlan?.name} planına geçerek daha fazla özelliğe erişim sağlayabilirsiniz.`
          ) : planChangeType === 'downgrade' ? (
            'Bu işlem mevcut plan sürenizin sonunda gerçekleşecektir.'
          ) : (
            'Plan değişikliğiniz hemen gerçekleşecektir.'
          )}
        </Typography>
        {selectedPlan?.price > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Ödeme tutarı: {selectedPlan?.price}₺
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          İptal
        </Button>
        <Button
          onClick={handleUpgrade}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#FFC300',
            '&:hover': {
              backgroundColor: '#e6b000'
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#000000' }} />
          ) : planChangeType === 'upgrade' ? (
            'Planı Yükselt'
          ) : (
            'Planı Değiştir'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanUpgradeModal; 