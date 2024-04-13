import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PhotoUploader = ({ uploadLimit = 1 }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  let chonk = (
    <>
      <div className="ant-upload2 ant-upload-select2">
        <span className="ant-upload2">
          <input type="file" style={{ display: "none" }} />
          <button
            style={{
              border: 0,
              background: "none",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </button>
        </span>
      </div>
    </>
  );
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <>
    {/* {chonk} */}
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= uploadLimit ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
export default PhotoUploader;



// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";


// const PhotoUploader = () => {
//   const [selectedPhoto, setSelectedPhoto] = useState(null);

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setSelectedPhoto(reader.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUploadClick = () => {
//     // Add your photo upload logic here
//     console.log("Photo uploaded:", selectedPhoto);
//   };

//   return (
//     <div>
//       {chonk}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handlePhotoChange}
//         style={{ display: "none" }}
//         id="photoInput"
//       />
//       <label htmlFor="photoInput" style={{ cursor: "pointer" }}>
//         {selectedPhoto ? (
//           <img
//             src={selectedPhoto}
//             alt="Selected"
//             style={{
//               maxWidth: "100%",
//               maxHeight: "200px",
//               marginBottom: "10px",
//             }}
//           />
//         ) : (
//           "Select Photo"
//         )}
//       </label>
//       <button
//         className=""
//         onClick={handleUploadClick}
//         disabled={!selectedPhoto}
//         type="button"
//       >
//         Upload Photo
//       </button>
//     </div>
//   );
// };

// export default PhotoUploader;
