import React from "react";

export const Skeleton: React.FC = () => {
  return (
    <div className="w-full max-w-sm p-4 mx-auto">
      <div className="flex space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-4">
          <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
