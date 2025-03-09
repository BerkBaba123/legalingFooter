import React from "react";
import Cleave from 'cleave.js/react';

const Forms = () => {
  return (
    <div className="container mt-4">
      <h2>Form Örnekleri</h2>
      <form>
        {/* Telefon Numarası */}
        <div className="mb-3">
          <label className="form-label">Telefon Numarası</label>
          <Cleave options={{
              numericOnly: true,
              delimiters: ['(', ')', ' ', ' ', ' '],
              blocks: [0, 3, 0, 3, 2, 2]
            }}
            className="form-control" placeholder="Telefon numaranızı girin" />
        </div>

        {/* Tarih Seçimi */}
        <div className="mb-3">
          <label className="form-label">Tarih Seç</label>
          <input type="date" className="form-control" />
        </div>

        {/* E-posta */}
        <div className="mb-3">
          <label className="form-label">E-Posta</label>
          <input type="email" className="form-control" placeholder="Email adresinizi girin" />
        </div>

        {/* Dosya Yükleme */}
        <div className="mb-3">
          <label className="form-label">Dosya Yükle</label>
          <input type="file" className="form-control" />
        </div>

        {/* Gönder Butonu */}
        <button type="submit" className="btn btn-primary">Gönder</button>
      </form>
    </div>
  );
};

export default Forms;
