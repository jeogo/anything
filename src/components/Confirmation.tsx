import React from "react";

interface ConfirmationProps {
  resetForm: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ resetForm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold mb-4 text-green-500">
          تم إرسال طلبك بنجاح!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          شكرًا لتقديم طلبك. سنقوم بالتواصل معك قريبًا لمتابعة طلبك. نحن متحمسون
          لخدمتك!
        </p>
        <button
          onClick={resetForm}
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          موافق
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
