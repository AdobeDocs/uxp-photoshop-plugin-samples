import React, { useState } from "react";
const { localFileSystem: fs, fileTypes } = require('uxp').storage;

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

  async function downloadIt(link) {
    const image = await fetch(link);
    console.log(link);
  
      const img = await image.arrayBuffer();
      const [file] = await fs.getFileForSaving();
      console.log(file);
      console.log(e);

    if (!file) {
      return;
    }
    await file.write(img);
  }

  return (
    <>
      <div>
        <input value={searchTerm} onChange={handleChange} />
        <button onClick={() => { getResults(searchTerm) }}>Search</button>
      </div>
      <div className="container">
        {searchResults ? (searchResults.map((item) => {
          { console.log(item.links) }
          return (
            <div>
              <div className="grid-image" style={{ backgroundImage: 'url(' + item.links.download + ')' }} />
              <button data-image={item.links.download} onClick={(e) => { downloadIt(e.target.dataset.image) }}>Download</button>
            </div>
          )
        })) : (<></>)}
      </div>
    </>
  )
};

export default Unsplash;
