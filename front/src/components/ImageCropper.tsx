import React, { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

interface ImageCropperProps {
  onImageUpload: (base64Image: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      getBase64(file, (base64String) => {
        setSelectedImage(base64String);
        onImageUpload(base64String);
      });
    }
  };

  const getBase64 = (file: File, callback: (result: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error("Error converting image to base64:", error);
      toast.error("Error converting image to base64");
    };
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select an image</p>
          </div>
        )}
      </Dropzone>
      {selectedImage && (
        <div>
          <p>Preview:</p>
          <img src={selectedImage} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
