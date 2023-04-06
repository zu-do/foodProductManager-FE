import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import "../Styles/BarcodeScanner.css"

function BarcodeScanner({ onScan }) {
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const qrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: 250 },
      /* verbose= */ false
    );

    setScanner(qrcodeScanner);

    return () => {
      qrcodeScanner.clear();
    };
  }, []);

  useEffect(() => {
    if (!scanner) return;

    const onScanSuccess = (data) => {
      onScan(data);
    };

    scanner.render(onScanSuccess);

    return () => {
      scanner.clear();
    };
  }, [scanner, onScan]);

  return <div id="reader" />;
}

export default BarcodeScanner;