"use client";

import { useState, useEffect } from 'react';

const FlashMessage = ({ message, type, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  
  const bgColor = type === 'error' ? 'bg-red-500/75' : 'bg-green-500/75';
  const visibilityClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full';

  return (
    <div id="flash-message"
      className={`md:w-3/4 mx-auto p-4 text-center rounded shadow-md text-white ${bgColor} z-50
        transition-all ease-in-out duration-500 ${visibilityClass}`}
    >
      <span id="flash-message-text">
        {message}
      </span>
    </div>
  );
};

export default FlashMessage;
