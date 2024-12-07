import React, { useRef, useState } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    // default config
    name: 'Your Name',
    profession: 'Your Job',
    email: 'me@email.com',
    phone: '+999 1234567890',
    website: 'www.website.com',
    logo: './assets/logo.png',
  });
  const [iconColor, setIconColor] = useState('#666666');
  const cardRef = useRef<HTMLDivElement>(null);

  // logo handle
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData((prevData) => {
            return {
              ...prevData,
              logo: reader.result as string,
            };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // download handle
  const handleDownload = async () => {
    if (cardRef.current) {
      const cardCanvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 3,
      });

      const a4Canvas = document.createElement('canvas');
      a4Canvas.width = 2480;
      a4Canvas.height = 3508;

      const ctx = a4Canvas.getContext('2d');
      if (ctx) {
        const cardWidth = a4Canvas.width / 2;
        const cardHeight = a4Canvas.height / 7;

        for (let row = 0; row < 7; row++) {
          for (let col = 0; col < 2; col++) {
            const x = col * cardWidth;
            const y = row * cardHeight;

            ctx.drawImage(
              cardCanvas,
              0,
              0,
              cardCanvas.width,
              cardCanvas.height,
              x,
              y,
              cardWidth,
              cardHeight
            );
          }
        }
      }

      const link = document.createElement('a');
      link.download = 'business-cards.png';
      link.href = a4Canvas.toDataURL('image/png', 2.0);
      link.click();
    }
  };

  // printing handle
  const handlePrint = async () => {
    if (cardRef.current) {
      const cardCanvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 3,
      });

      const a4Canvas = document.createElement('canvas');
      a4Canvas.width = 2480;
      a4Canvas.height = 3508;

      const ctx = a4Canvas.getContext('2d');
      if (ctx) {
        const cardWidth = a4Canvas.width / 2;
        const cardHeight = a4Canvas.height / 7;

        for (let row = 0; row < 7; row++) {
          for (let col = 0; col < 2; col++) {
            const x = col * cardWidth;
            const y = row * cardHeight;

            ctx.drawImage(
              cardCanvas,
              0,
              0,
              cardCanvas.width,
              cardCanvas.height,
              x,
              y,
              cardWidth,
              cardHeight
            );
          }
        }
      }

      const imgData = a4Canvas.toDataURL('image/png', 2.0);
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'absolute';
      printFrame.style.top = '0';
      printFrame.style.left = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = 'none';

      document.body.appendChild(printFrame);

      const doc = printFrame.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <style>
                body { 
                  margin: 0; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  height: 100vh; 
                }
                img { 
                  width: 100%; 
                  height: auto; 
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" />
            </body>
          </html>
        `);
        doc.close();
      }

      printFrame.onload = () => {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
        document.body.removeChild(printFrame);
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div
        ref={cardRef}
        className="w-full max-w-sm sm:max-w-md h-44 border border-gray-400 p-4 flex flex-row justify-between items-center"
      >
        <div className="flex flex-col justify-start text-left w-2/3">
          <h3
            contentEditable
            suppressContentEditableWarning
            className="text-lg sm:text-xl font-bold text-gray-800 outline-none"
            onBlur={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                name: e.target.textContent || '',
              }));
            }}
          >
            {formData.name}
          </h3>
          <p
            contentEditable
            suppressContentEditableWarning
            className="text-sm text-gray-600 outline-none"
            onBlur={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                profession: e.target.textContent || '',
              }));
            }}
          >
            {formData.profession}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <i className="fas fa-envelope" style={{ color: iconColor }}></i>
            <span
              contentEditable
              suppressContentEditableWarning
              className="outline-none"
              onBlur={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  email: e.target.textContent || '',
                }));
              }}
            >
              {formData.email}
            </span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <i className="fas fa-phone" style={{ color: iconColor }}></i>
            <span
              contentEditable
              suppressContentEditableWarning
              className="outline-none"
              onBlur={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  phone: e.target.textContent || '',
                }));
              }}
            >
              {formData.phone}
            </span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <i className="fas fa-globe" style={{ color: iconColor }}></i>
            <span
              contentEditable
              suppressContentEditableWarning
              className="outline-none"
              onBlur={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  website: e.target.textContent || '',
                }));
              }}
            >
              {formData.website}
            </span>
          </p>
        </div>
        <div className="h-24 w-24 flex items-center justify-center">
          <label className="w-full h-full border border-gray-300 flex items-center justify-center text-sm text-gray-500 cursor-pointer">
            {formData.logo ? (
              <img src={formData.logo} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              'Upload Logo'
            )}
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <input
          type="color"
          value={iconColor}
          onChange={(e) => setIconColor(e.target.value)}
          className="w-10 h-10 p-0 border-none cursor-pointer"
        />
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
        >
          Download A4 (2x7)
        </button>
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out hidden md:block"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default App;
