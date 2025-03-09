import React, { useState } from "react";

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mt-4 text-center">
      <h2>Modal Sayfası</h2>

      {/* Modal Aç Butonu */}
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Modal Aç
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Bilgilendirme</h5>
                <button type="button" className="btn-close" onClick={() => setIsOpen(false)}></button>
              </div>
              <div className="modal-body">
                <p>Bu bir modal sayfasıdır!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPage;
