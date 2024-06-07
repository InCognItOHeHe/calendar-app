// src/ResponseTimeChecker.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ResponseTimeChecker = ({ url }) => {
  const [responseTime, setResponseTime] = useState(null);

  useEffect(() => {
    const checkResponseTime = async () => {
      const start = performance.now();
      try {
        await axios.get(url);
        const end = performance.now();
        setResponseTime(end - start);
      } catch (error) {
        console.error("Error checking response time:", error);
      }
    };

    checkResponseTime();
  }, [url]);

  return (
    <div>
      {responseTime !== null ? (
        <p>Response Time: {responseTime.toFixed(2)} ms</p>
      ) : (
        <p>Checking response time...</p>
      )}
    </div>
  );
};

export default ResponseTimeChecker;
