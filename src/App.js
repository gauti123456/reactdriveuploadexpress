import React, { useRef } from "react";

const App = () => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Uploaded files:", data.files);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  return (
    <div>
      <h1>Upload Files to Google Drive</h1>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}>Upload Files</button>
    </div>
  );
};

export default App;
