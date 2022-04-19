import React from 'react';
import "./css.css";

const AdSense = (props) => {
  React.useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block" }} {...props}></ins>;
};

export default AdSense;