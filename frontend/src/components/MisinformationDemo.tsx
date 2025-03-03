"use client";

import { useState } from "react";
import Clean from "./Clean";
import Highlighted from "./highlighted";

export default function MisinformationDemo() {
  // State to track whether to show the popup and which component to display
  const [showPopup, setShowPopup] = useState(true);
  const [isActivated, setIsActivated] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Function to handle the activation of the article
  const handleActivate = () => {
    setShowPopup(false); // Hide the popup after clicking "Activate"
    setIsActivated(true); // Set the article to show the highlighted version
    setShowFloatingButton(false); // Hide the floating button when activated
  };

  // Function to handle closing the popup without activation
  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup without changing the view
    setIsActivated(false); // Show the clean version of the article
    setShowFloatingButton(true); // Show the floating button after dismissing
  };

  return (
    <div className="relative">
      {/* Main content */}
      <div className={showPopup ? "opacity-50" : "opacity-100"}>
        {isActivated ? <Highlighted /> : <Clean />}
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">The following website may contain misinformation</h2>
            <p className="mb-6">
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Dismiss
              </button>
              <button
                onClick={handleActivate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Activate AI Tool
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating round AI button with custom positioning */}
      {showFloatingButton && (
        <div className="fixed left-6 z-50" style={{ bottom: '100px' }}>
          <button
            onClick={handleActivate}
            className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center font-bold transition-all hover:scale-110"
            title="Activate AI Tool"
          >
            AI
          </button>
        </div>
      )}
    </div>
  );
} 