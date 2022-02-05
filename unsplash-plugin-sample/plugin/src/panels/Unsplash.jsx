import React, { useState } from "react";
import { CloudDownload, LinkExternal, Heart, User } from '@styled-icons/boxicons-regular';
const { localFileSystem: fs, fileTypes } = require('uxp').storage;
const app = require('photoshop').app;

import { getPhotos } from "../api/request";
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

    try {
      const img = await image.arrayBuffer();
      const file = await fs.getFileForSaving("image.png");
      await file.write(img);
      const currentDocument = app.activeDocument;
      const newDocument = await app.open(file);
      if (currentDocument) {
        await newDocument.activeLayers[0].duplicate(currentDocument);
        await newDocument.close();
      }
    } catch (e) {
      console.log(e);
    }

    if (!file) {
      return;
    }
  }

  return (
    <>
      <div class="search-container">
        <input value={searchTerm} onChange={handleChange} />
        <button onClick={() => { getResults(searchTerm) }}>Search</button>
      </div>
      <div className="container">
        {searchResults ? (searchResults.map((item) => {
          { console.log(item.links) }
          return (
            <>
              <div className="image-container">
                <div className="grid-image" style={{ backgroundImage: 'url(' + item.links.download + ')' }} />
                <div className="details-container">
                  <div>
                    Name: {item.alt_description}
                  </div>
                  <div>
                    By <User className="icon" />: {item.user.username}
                  </div>
                  <div>
                    Likes <Heart className="icon" />: {item.likes}
                  </div>
                  <div className="icons-container">
                    <div className="icon-btn" data-image={item.links.download} onClick={(e) => { downloadIt(e.target.dataset.image) }}>Download <CloudDownload className="icon" /></div>
                    <div className="icon-btn"><a className="link" href={item.links.html}>Link <LinkExternal className="icon" /></a></div>
                  </div>
                </div>
              </div>
              <hr />
            </>
          )
        })) : (<></>)}
      </div>
    </>
  )
};

export default Unsplash;
