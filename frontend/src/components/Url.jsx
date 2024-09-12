import qrcode from "qrcode";
import { useState } from "react";
import '../main.css';  

const Url = () => {
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [unshortUrl, setUnshortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setUnshortUrl("");
    if (url === '') {
        setError("Please enter a URL to shorten");
        return  
    }
    try {
      console.log({ tag, url });
      const exists = await fetch("https://shrinqr.onrender.com/api/short/checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const exist = await exists.json();
      if (exist.exists) {
        console.log('EXISTS')
        setShortUrl(`https://shrinqr.onrender.com/${exist.data.tag}`);
        return;
      }
      const response = await fetch("https://shrinqr.onrender.com/api/short/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag, url }),
      });
      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }
      const data = await response.json();
      setShortUrl(`https://shrinqr.onrender.com/${data.tag}`);
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    setError("");
    setUnshortUrl("");
    setQrCode("");
    if (url === '') {
        setError("Please enter a URL to generate QR");
        return  
    }
    try {
      const valueToEncode = shortUrl || url;
      if (!valueToEncode) {
        throw new Error("URL is missing!");
      }
      // Generate QR Code from the shortUrl or the original URL
      const generatedQRCode = await qrcode.toDataURL(valueToEncode);
      setQrCode(generatedQRCode); // Set the generated QR code to state
    } catch (err) {
      setError("Failed to generate QR");
    }
  };

  const handleUnShorten = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setUnshortUrl("");
    setQrCode("");
    if (url === '') {
        setError("Please enter a URL to unshorten");
        return  
    }
    try {
      console.log(`Unshortening the URL for ${url}`);
      const response = await fetch(`https://shrinqr.onrender.com/api/short/unshort/${url}`);
      setUnshortUrl(await response.json());
    } catch (err) {
      setError("Failed to unshorten URL");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center mt-48 bg-gray-800 rounded-2xl px-32 ${qrCode ? ('pb-12') : ('pb-32')} pt-20 ml-80 mr-80 `}>
      {error ? (
        <div className="mt-4 text-red-500 h-6">
          <p>Error: {error}</p>
        </div>):(<div className="h-10"></div>)}

      <form>
      <label className="text-white font-bold mt-2">Enter URL:</label><br/>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter link"
          className="border border-black rounded-md px-2 py-2 w-96 outline-none focus:border-blue-500 focus:ring-2"
          autoComplete="off"
          required
        />
        <br/>
        <br/>

        {shortUrl || unshortUrl ? (<>
          <label className="text-white font-bold">Shortened Link:</label><br/>
          <input
          type="text"
          name="tag"
          value={unshortUrl || shortUrl}
          className="border border-black rounded-md px-2 py-2 w-96 outline-none"
          autoComplete="off"
        /></>)
        : 
        (<><label className="text-white font-bold">Custom Alias:</label><br/>
        <input
          type="text"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter custom alias"
          className="border border-black rounded-md px-2 py-2 w-96 outline-none focus:border-blue-500 focus:ring-2"
          autoComplete="off"
        /></>)}

        <br />
        <div className="flex flex-row justify-between items-center pt-2">
          <button
            onClick={handleShorten}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md"
          >
            Shorten
          </button>
          <button
            onClick={handleGenerateQR}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md"
          >
            Generate QR
          </button>
          <button
            onClick={handleUnShorten}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md"
          >
            UnShorten
          </button>
        </div>
      </form>

      {qrCode && (
        <div className="mt-8">
          <p className="text-white pb-2 items-center font-bold">QR Code:</p>
          <img src={qrCode} alt="Generated QR Code" className="h-48"/>
        </div>
      )}

    </div>
  );
};

export default Url;
