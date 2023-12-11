import React, { useState } from 'react';

const PhotoUploader = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    // Add your photo upload logic here
    console.log('Photo uploaded:', selectedPhoto);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ display: 'none' }}
        id="photoInput"
      />
      <label htmlFor="photoInput" style={{ cursor: 'pointer' }}>
        {selectedPhoto ? (
          <img
            src={selectedPhoto}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
          />
        ) : (
          'Select Photo'
        )}
      </label>
      <button className="" onClick={handleUploadClick} disabled={!selectedPhoto} type='button'>
        Upload Photo
      </button>
    </div>
  );
};

export default PhotoUploader;
