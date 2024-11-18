// QrScanner.js
import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'jsqr';
import Webcam from 'react-webcam';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import backgroundImage from '../images/b2.png';

const QrScanner = () => {
  const webcamRef = useRef(null);
  const [qrCode, setQrCode] = useState('');
  const [qrDetected, setQrDetected] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = QrReader(imageData.data, imageData.width, imageData.height);
      if (code) {
        setQrCode(code.data);
        setQrDetected(true);
        markAttendance(code.data);
      } else {
        setQrDetected(false);
      }
    };
    img.src = imageSrc;
  };

  const markAttendance = async (empId) => {
    try {
      await axios.post('http://localhost:4000/api/employees/attendance/mark', { empId });
      const response = await axios.get(`http://localhost:4000/api/employees/attendance/status/${empId}`);
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative' }}>
      <div 
        style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1 }}/>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '640px', height: '480px' }}
          videoConstraints={{
            facingMode: 'environment',
          }}
        />
        {qrDetected && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255, 0, 0, 0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            QR Code Detected!
          </div>
        )}
      </div>
      {qrCode && <p style={{ marginTop: '20px' }}>QR Code: {qrCode}</p>}
      {status && <p style={{ marginTop: '20px' }}>Today's Status: {status}</p>}
    </div>
  );
};

export default QrScanner;