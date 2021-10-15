import React, { useState } from "react";

import { getPhotos } from "../../api/request";
import "./Unsplash.css";

const Unsplash = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  async function getResults(searchTerm) {
    setSearchResults(await getPhotos(searchTerm));
  }

  return (
    <>
      <div>
        <input value={searchTerm} onChange={handleChange} />
        <button onClick={() => { getResults(searchTerm) }}>Search</button>
      </div>
      <div className="container">
        {searchResults ? (searchResults.map((item) => {
          return (
            <div className="grid-image" style={{ backgroundImage: 'url(' + item.links.download + ')' }} />
          )
        })) : (<></>)}
      </div>
    </>
  )
};

export default Unsplash;
