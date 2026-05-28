import React, { useContext, useState } from "react";
import PixabayContext from "../Context/PixaBay_context";

const categories = [
  "nature",
  "animals",
  "people",
  "travel",
  "buildings",
  "food",
  "sports",
  "computer",
];

const Images = () => {
  const { imageData, setSearch, setCategory } =
    useContext(PixabayContext);

  const [input, setInput] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [showMsg, setShowMsg] = useState(false); // 🔥 NEW ADDED

  const handleSearch = () => {
    setSearch(input);
    setShowMsg(false); // hide warning after search
  };

  return (
    <div>

      {/* HERO */}
      <div className="hero">
        <h1>Image Explorer</h1>

        <p className="tagline">
          Search or choose a category to explore images
        </p>

        <p className="disclaimer">
          Note: Some keywords may not return results due to API limitations
        </p>

        {/* 🔥 WARNING MESSAGE */}
        {showMsg && (
          <p className="warning">
            ⚠ Please search something first, then select a category for better results.
          </p>
        )}

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search images..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (input.trim() === "") {
                  setShowMsg(true); // 🔥 show warning
                } else {
                  setCategory(cat);
                  setShowMsg(false);
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* GALLERY */}
      <div className="gallery">
        {imageData.map((image) => (
          <div className="item" key={image.id}>
            <img
              src={image.webformatURL}
              alt=""
              onClick={() => setSelectedImg(image.webformatURL)}
            />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedImg && (
        <div
          className="modal"
          onClick={() => setSelectedImg(null)}
        >
          <img src={selectedImg} alt="" />
        </div>
      )}

    </div>
  );
};

export default Images;