import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PopupAd: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
        <h2 className="text-2xl font-bold mb-3 text-blue-700">🚀 JNU INNOVATE 2025: HACKATHON</h2>
        <p className="text-gray-700 mb-3">Join us for an exciting hackathon at Jaipur National University!</p>
        <div className="text-gray-600 text-sm mb-4">
          <p><strong>📅 Date & Time:</strong> April 5, 2025 (Saturday) | </p>
          <p><strong>📍 Venue:</strong> Central Library, SADTM Campus, JNU</p>
          <p><strong>🏆 Prizes:</strong> Cash Prizes, Trophies & Certificates</p>
        </div>
        <div className="flex justify-center gap-4">
          
          <button
            onClick={() => setShowPopup(false)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupAd;
