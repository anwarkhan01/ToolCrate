import React, {use, useRef, useState} from "react";

const UrlShortner = () => {
  const [url, setUrl] = useState("");
  const [shortURL, setShortURL] = useState("");
  const shortUrlRef = useRef(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(url));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/url-convert/original-short`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({originalURL: url}),
        }
      );
      if (!response.ok) {
        console.log("Some Error Occured!");
        return;
      }
      const data = await response.json();
      console.log(data);
      setShortURL(data.data);
    } catch (error) {
      console.log("Some Unexpected Error Occured!", error);
    }
  };

  const handleCopy = () => {
    shortUrlRef.current.select();
    navigator.clipboard.writeText(shortUrlRef.current.value);
    setTimeout(() => {
      window.getSelection().removeAllRanges();
    }, 1000);
  };
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl md:p-8 p-5  flex-col gap-2">
        <h2 className="text-2xl font-semibold text-center text-[#5A189A] mb-6">
          URL Shortener
        </h2>
        <form onSubmit={onSubmit} className="flex gap-2 w-full ">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Paste your URL here"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
          />
          <button
            type="submit"
            className="bg-[#5A189A] hover:bg-[#4a0e87] text-white px-5 py-2 rounded-lg text-sm transition duration-300 cursor-pointer"
          >
            Shorten
          </button>
        </form>
        {shortURL && (
          <form
            className="flex gap-2 w-full mt-3 "
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={shortURL}
              ref={shortUrlRef}
              placeholder="Shorten URL"
              readOnly
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm "
            />
            <button
              type="submit"
              className="bg-[#5A189A] hover:bg-[#4a0e87] text-white px-5 py-2 rounded-lg text-sm transition duration-300 cursor-pointer "
              onClick={handleCopy}
            >
              Copy
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UrlShortner;
