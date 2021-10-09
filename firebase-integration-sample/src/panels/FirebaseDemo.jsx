import React, { useEffect, useState } from "react";
import getData from "../../firebase";

const FirebaseDemo = () => {
  const [names, setNames] = useState();

// Making calls to fetch data and then updating the state variable
  useEffect(() => {
    getData().then((data) => {
      setNames(data);
    });
  }, []);

  return (
    <>
      {names ? (
        names.map((item) => {
          return(<sp-body>{item.name}</sp-body>);
        })
      ) : (
        <></>
      )}
    </>
  );
  
};

export default FirebaseDemo;
