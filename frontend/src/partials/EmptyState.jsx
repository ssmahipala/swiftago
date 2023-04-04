import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <svg
        className="w-12 h-12 text-gray-400 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 17l5-5m0 0l-5-5m5 5h-8"
        />
      </svg>
      <p className="text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;
