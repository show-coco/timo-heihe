import React, { useState, useEffect } from "react";

export const UseShareBtn = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);
  return {
    url,
  };
};
