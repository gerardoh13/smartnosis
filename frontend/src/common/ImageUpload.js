import React from "react";

function ImageUpload({ uploadSuccess, setUrl, formKey }) {
  //   https://cloudinary.com/documentation/upload_widget_reference

    const cloudName = "dolnu62zm";
    const uploadPreset = "yssxueby";

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName, 
        uploadPreset: uploadPreset,
        folder: "Smartnosis",
        cropping: true,
        sources: ["local", "camera"],
        multiple: false,
        context: { alt: "user_uploaded" },
        clientAllowedFormats: ["jpg", "HEIF"],
        maxImageFileSize: 5000000,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          uploadSuccess(error, result, setUrl, formKey);
          myWidget.close();
        }
      }
    );

  return (
    <>
      <button id="upload_widget" className="btn btn-primary" type="button" onClick={() => myWidget.open()}>
        Upload
      </button>
    </>
  );
}

export default ImageUpload;
