import React, { use, useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [radioValue, setRadioValue] = useState("");
  const [indexForRadio, setIndexForRadio] = useState("");
  const [arrayOfNumbers, setArrayOfNumbers] = useState(
    Array.from({ length: 10 }, (_, index) => index + 1)
  );

  const handleFolderUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const imageUrls = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages(imageUrls);
  };

  const handleCheckboxChange = (image) => {
    setSelectedImages((prev) =>
      prev.includes(image) ? prev.filter((i) => i !== image) : [...prev, image]
    );
  };

  const handleSubmit = () => {
    setImages((prev) =>
      prev.filter((image) => !selectedImages.includes(image))
    );
    setRemovedImages((prev) => [...prev, ...selectedImages]);
    setSelectedImages([]);
    if (removedImages.length <= 0 || radioValue == "") {
      alert("Please Select at least 1 image");
      return;
    }
    const updatedArray = arrayOfNumbers.filter(
      (_, index) => indexForRadio !== index
    );
    setArrayOfNumbers(updatedArray);
  };

  const handleChangeRadio = (e, index) => {
    setRadioValue(e.target.value);
    setIndexForRadio(index);
  };

  return (
    <div>
      <h2>Upload a Folder of Images</h2>
      <div
        style={{
          border: "1px solid black",
          paddingLeft: "1465px",
        }}
      >
        <input
          type="file"
          webkitdirectory="true"
          multiple
          onChange={handleFolderUpload}
          id="folderInput"
          style={{ display: "none" }}
        />

        <button
          onClick={() => document.getElementById("folderInput").click()}
          style={{
            fontSize: "24px",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            width: "50px",
            height: "50px",
          }}
        >
          +
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            width: "50%",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: "50%",
              borderBottom: "1px solid black",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {arrayOfNumbers.map((el, i) => {
              return (
                <div key={i} style={{ paddingLeft: "20px" }}>
                  <input
                    type="radio"
                    name="number"
                    value={el}
                    onChange={(e) => handleChangeRadio(e, i)}
                  />
                  {el}
                </div>
              );
            })}
          </div>
          <div style={{ height: "50%", overflow: "auto" }}>
            <ul>
              <h1>{radioValue} :</h1>
              {removedImages.map((image, index) => (
                <li key={index} style={{ margin: "10px" }}>
                  <img
                    src={image.url}
                    alt={image.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          style={{
            border: "1px solid black",
            width: "50%",
            height: "400px",
            overflow: "auto",
          }}
        >
          <button onClick={handleSubmit} style={{ cursor: "pointer" }}>
            Submit
          </button>
          <ul>
            {images.map((img, index) => (
              <li key={index} style={{ margin: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectedImages.includes(img)}
                  onChange={() => handleCheckboxChange(img)}
                />
                <img
                  src={img.url}
                  alt={img.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
