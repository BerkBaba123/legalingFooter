import React, { useState } from "react";

const Alerts = () => {
  const [alert, setAlert] = useState(null);

  // Alert gösterme fonksiyonu
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // 3 saniye sonra kapat
  };

  return (
    <div className="container mt-4 text-center">
      <h2>Alerts & Confirmations</h2>

      {/* Alert Göster */}
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
        </div>
      )}

      {/* Butonlar */}
      <button className="btn btn-success m-2" onClick={() => showAlert("success", "Başarıyla tamamlandı!")}>
        Başarı Mesajı
      </button>
      <button className="btn btn-danger m-2" onClick={() => showAlert("danger", "Hata oluştu!")}>
        Hata Mesajı
      </button>
      <button className="btn btn-warning m-2" onClick={() => showAlert("warning", "Dikkat!")}>
        Uyarı Mesajı
      </button>
      <button className="btn btn-info m-2" onClick={() => showAlert("info", "Bilgilendirme mesajı.")}>
        Bilgi Mesajı
      </button>
    </div>
  );
};

export default Alerts;
