import React, { useEffect, useState } from "react";
import PixabayContext from "./PixaBay_context";

const PixabayState = (props) => {
  const [imageData, setImageData] = useState([]);
  const [search, setSearch] = useState("nature");
  const [category, setCategory] = useState("nature");

  const api_key = "56027296-f77bd82c999b537683cfd5eb1";

  useEffect(() => {
    const fetchImages = async () => {
      const query = search.trim() === "" ? category : search;

      const res = await fetch(
        `https://pixabay.com/api/?key=${api_key}&q=${encodeURIComponent(
          query
        )}&category=${category}&image_type=photo&safesearch=false&per_page=35`
      );

      const data = await res.json();
      setImageData(data.hits || []);
    };

    fetchImages();
  }, [search, category]);

  return (
    <PixabayContext.Provider
      value={{ imageData, setSearch, setCategory }}
    >
      {props.children}
    </PixabayContext.Provider>
  );
};

export default PixabayState;