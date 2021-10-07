import React, { useEffect, useState } from "react";
import getData from "../../firebase";

export const FirebaseDemo = () => {
  const [names, setNames] = useState();

  useEffect(() => {
    getData().then((data) => {
      setNames(data);
    });
  }, []);

  return (
    <>
      {names ? (
        names.map((item) => {
          <sp-body>{item.name}</sp-body>;
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default FirebaseDemo;
