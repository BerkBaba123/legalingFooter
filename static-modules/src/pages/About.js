// src/pages/About.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
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

      <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
        <Typography paragraph sx={paragraphStyle}>
          Legaling, Temmuz 2020 tarihinde iki temel vizyonla pazara çıkışını gerçekleştiren Türkiye'nin ilk İngilizce-Türkçe, Türkçe-İngilizce hukuk terimleri veri tabanıdır.
        </Typography>

        <Typography paragraph sx={paragraphStyle}>
          Legaling'in birincil vizyonu, hukuk terimleri özelinde güvenilir ve kapsayıcı bir kaynak yaratarak genel sözlüklerin sebep olduğu kavram karmaşasını ve bilgi kirliliğini ortadan kaldırmaktır. Bu doğrultuda, İngilizce-Türkçe ve Türkçe-İngilizce hukuk terimleri tercümesinde "profesyoneller için, profesyoneller tarafından" hizmet verme idealiyle yola çıkan Legaling, 25 kişilik hukukçu araştırma ekibi ve teknik ekibiyle birlikte hukuk alanında yaşanan çeviri problemlerine profesyonel bir çözüm sunmaktadır.
        </Typography>

        <Typography paragraph sx={paragraphStyle}>
          Hukuk ve dil arasındaki yakın ilişki göz önünde bulundurulduğunda, hukuk alanında hayata geçirilecek ileri derece teknolojik girişimlerin öncelikle dil engelini aşması gerekmektedir. Bu kapsamda, Legaling'in ikincil vizyonu İngilizce-Türkçe hukuk terimlerinin etiketleme çalışmasını gerçekleştirmektir. Nitekim, küreselden yerel hukuk ekosistemine nüfuz etmek isteyen hukuk teknolojileri ile yerelden küresele açılmak isteyen hukuk teknolojilerine süreç boyunca gerekli altyapıyı sağlamak ve iki pazar arasında bir köprü görevi görmek amaçlanmaktadır.
        </Typography>

        <Typography paragraph sx={paragraphStyle}>
          Cümle sözlüğü, hukuk dalı kırılımları, eş anlamlı kelimeler, çoğul kullanımlar, açıklamalar ve örnek cümlelerle, hukuk alanında yaşanan çeviri problemlerinin önüne geçilmesini mümkün kılan veri tabanına, her hafta 700-800 adet kavram çifti eklenmektedir. Veri tabanında yapılan zenginleştirmeler, kullanıcılar tarafından aratılıp karşılığı bulunamadığı tespit edilen kavramlara öncelik verilerek yapılmaktadır. Her bir kavram dört farklı hukukçunun denetiminden geçtikten sonra veri tabanında yer edinmektedir.
        </Typography>

        <Typography paragraph sx={paragraphStyle}>
          Hukuk alanındaki bu büyük ihtiyacı Legaling ailesi olarak karşılamaktan mutluluk duyuyoruz. Çok değerli hukukçuların Legaling ile ortaya koyacağı çok önemli işlerin olacağını biliyor ve Türk hukuk dünyasında bir fark yaratacak bu zorlu süreçte bize güvendiğiniz ve bizimle beraber yürüdüğünüz için teşekkür ediyoruz.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 4,
            textAlign: 'left',
            fontStyle: 'italic'
          }}
        >
          Legaling Ailesi
        </Typography>
      </Box>
    </Box>
  );
};

const paragraphStyle = {
  lineHeight: '1.8',
  fontWeight: 300,
  fontSize: '16px',
  marginBottom: '32px',
  textAlign: 'justify',
  color: 'inherit'
};

export default About;
