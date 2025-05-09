import React, {useRef, useState} from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

const LinkToQR = () => {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);
  const handleUrlChange = (e) => {
    if (qrValue.length > 0) {
      setQrValue("");
    }
    setUrl(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setQrValue(url);
  };

  const handleDownload = async () => {
    const qrElement = qrRef.current;
    if (!qrElement) return;

    const canvas = await html2canvas(qrElement);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qr-code.png";
    link.click();
  };
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl md:p-8 p-5  flex-col gap-2">
        <h2 className="text-2xl font-semibold text-center text-[#5A189A] mb-6">
          Link To QR Code
        </h2>
        <form onSubmit={onSubmit} className="flex gap-2 w-full ">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Paste your URL here"
            className="flex-1 border border-gray-300 rounded-lg w-[70%] md:w-[80%] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
          />
          <button
            type="submit"
            className="bg-[#5A189A] hover:bg-[#4a0e87] px-3 py-2 text-white w-[30%] md:w-[20%] rounded-lg text-sm transition duration-300 cursor-pointer"
          >
            Generate QR
          </button>
        </form>
        {qrValue && (
          <div className="mt-5 flex justify-center items-center flex-col">
            <div ref={qrRef} className="bg-white p-4">
              <QRCode
                size={256}
                className="block"
                value={qrValue}
                viewBox={`0 0 256 256`}
              />
            </div>
            <button
              className="cursor-pointer bg-purple-900 text-white px-3 py-1 rounded-lg mt-3"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkToQR;
