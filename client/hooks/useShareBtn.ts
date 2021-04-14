import React, { useState, useEffect } from "react";

export const UseShareBtn = () => {
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);
  return {
    shareUrl,
  };
};
