
import React from "react";
import { useState } from "react";
import { API_KEY } from "../../utils";
function ImageToTextConverter() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
      setImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  const extractText = () => {

    console.log(image)
    if (image == null) {
      alert('Please upload image first.');
      return;
    }
    setExtractedText([{ text: "Loading..." }])
    // this is api structure for receiving the image as request
    const formData = new FormData();
    formData.append('image', image);

    fetch('https://api.api-ninjas.com/v1/imagetotext', {
      method: 'POST',
      body: formData,
      headers: {
        'x-api-key': API_KEY,
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          setExtractedText([{ text: data.error }])
          return;
        }
        setExtractedText(data); 
      })
      .catch(error => {
        setExtractedText([{ text: error }])
        console.log(extractText);
        console.error('Error:', error);

      });
    }

      const handleCopy = async () => {
      // Check if the Clipboard API is supported by the browser
      if (navigator.clipboard) {
        
        const text = document.getElementById('copy-text').innerText;
        console.log(text)
        await navigator.clipboard.writeText(text)
          .then(() => {
            console.log('Text copied to clipboard:',text);
            alert('Text copied to clipboard!');
          })
          .catch((error) => {
            console.error('Error copying text to clipboard:', error);
            alert('Error copying text to clipboard!');
          });
      } else {
        console.warn('Clipboard API not supported');
        alert('Clipboard API not supported!');
      }
    }
  

  return (
    <div className="flex md:flex-row flex-col my-8 mx-16 justify-between">
      <div className="w-full md:w-2/3">
        <div className="flex justify-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload-image"
          />
          <label
            htmlFor="upload-image"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Upload Image
          </label>
        </div>
        {uploadedImage && (
          <div className="flex justify-center mb-4 w-2/3 h-[450px] m-auto ">
            <img src={uploadedImage} alt="Uploaded" className="w-auto h-auto shadow-md rounded-2xl" />
          </div>
        )}


      </div>
      <div className="flex-col w-full md:w-1/3">

        <div className="flex justify-center">
          <button
            onClick={extractText}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Extract Text
          </button>
        </div>
        <div className="flex justify-center w-auto mt-4">
          <div className="max-w-md w-auto border border-gray-300 rounded p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2">Extracted Text</h2>
              <button
                onClick={handleCopy}
                className="text-green-500 hover:bg-green-600 hover:text-white border-green-500 border mx-3 text-sm font-semibold bg-transparent px-4 rounded-md shadow-lg transition duration-300 ease-in-out"
              >
                Copy
              </button>
            </div>
            <p className="text-black" id="copy-text">{extractedText.map((text, index) => (text.text + " "))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToTextConverter;