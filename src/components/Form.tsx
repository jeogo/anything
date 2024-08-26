import React, { useState } from "react";
import Image from "next/image";
import wilayas from "../utils/willays";
import axios from "axios";
import Confirmation from "./Confirmation";

interface FormProps {
  selectedImages: string[];
  totalPrice: number;
  originalPrice: number;
}

export default function Form({
  selectedImages,
  totalPrice,
  originalPrice,
}: FormProps) {
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");
  const [selectedBaladiya, setSelectedBaladiya] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWilaya(e.target.value);
    setSelectedBaladiya("");
  };

  const baladiyas =
    wilayas.find((wilaya) => wilaya.name === selectedWilaya)?.baladiyas || [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate that wilaya and baladiya are selected
    if (!selectedWilaya || !selectedBaladiya) {
      console.error("Wilaya and Baladiya are required.");
      return;
    }

    const data = {
      fullName: (event.target as any).fullName.value,
      phoneNumber: (event.target as any).phoneNumber.value,
      email: (event.target as any).email.value,
      wilaya: selectedWilaya,
      baladiya: selectedBaladiya,
      selectedImages: selectedImages.map((img) => ({
        imageName: img.split("/").pop() as string,
        imageUrl: img,
      })),
      totalPrice: totalPrice,
      originalPrice: originalPrice,
      discountApplied: selectedImages.length > 1,
    };

    try {
      const response = await axios.post("/api/submitForm", data);

      if (response.status === 200) {
        setShowConfirmation(true);
        setSubmitted(true);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const resetForm = () => {
    setShowConfirmation(false);
    setSubmitted(false);
    setSelectedWilaya("");
    setSelectedBaladiya("");
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl border border-gray-300 bg-white text-brown rounded-lg shadow-lg p-8 mt-16 mx-auto text-browne">
      <div className="w-full md:w-2/3 md:pl-10 text-browne">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800">
          أرسل طلبك
        </h2>

        {/* Special Offer Section */}
        <div className="bg-red-600 text-white text-center p-4 rounded-lg shadow-lg mb-8 text-browne">
          <h2 className="text-3xl font-bold mb-2">عرض اليوم</h2>
          <p className="text-lg mb-4 font-bold">
            اشترِ أكثر لتوفّر أكثر! استفد من خصومات تصاعدية مع كل قطعة إضافية.
          </p>
          <p className="text-xl font-semibold">ابدأ أناقتك الآن!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 text-browne">
            <label
              className="block text-lg font-medium mb-3 text-gray-700"
              htmlFor="fullName"
            >
              الاسم الكامل
            </label>
            <input
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-gray-700 text-lg"
              id="fullName"
              type="text"
              placeholder="أدخل اسمك الكامل"
              required
            />
          </div>

          <div className="mb-8">
            <label
              className="block text-lg font-medium mb-3 text-gray-700"
              htmlFor="phoneNumber"
            >
              رقم الهاتف
            </label>
            <input
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-gray-700 text-lg"
              id="phoneNumber"
              type="text"
              placeholder="أدخل رقم هاتفك"
              required
            />
          </div>

          {/* Email Input */}

          <div className="mb-8">
            <label
              className="block text-lg font-medium mb-3 text-gray-700"
              htmlFor="wilaya"
            >
              الولاية
            </label>
            <select
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700 text-lg"
              id="wilaya"
              value={selectedWilaya}
              onChange={handleWilayaChange}
              required
            >
              <option value="" disabled>
                اختر الولاية
              </option>
              {wilayas.map((wilaya, index) => (
                <option key={index} value={wilaya.name}>
                  {index + 1}-{wilaya.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label
              className="block text-lg font-medium mb-3 text-gray-700"
              htmlFor="baladiya"
            >
              البلدية
            </label>
            <select
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700 text-lg"
              id="baladiya"
              value={selectedBaladiya}
              onChange={(e) => setSelectedBaladiya(e.target.value)}
              disabled={!selectedWilaya}
              required
            >
              <option value="" disabled>
                اختر البلدية
              </option>
              {baladiyas.map((baladiya, index) => (
                <option key={index} value={baladiya}>
                  {baladiya}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label
              className="block text-lg font-medium mb-3 text-gray-700"
              htmlFor="email"
            >
              البريد الإلكتروني (اختياري)
            </label>
            <input
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-gray-700 text-lg"
              id="email"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
            />
            <p className="text-sm text-gray-600 mt-2">
              سنرسل لك جميع العروض الرائعة إلى بريدك الإلكتروني، كن أول من يحصل
              على الأناقة بين يديك.
            </p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-extrabold">المجموع الكلي:</h3>
            <p className="text-5xl font-bold mt-4">
              {selectedImages.length > 1 && (
                <span className="text-red-500 line-through mr-4">
                  {originalPrice} دج
                </span>
              )}
              <span className="text-green-500">{totalPrice} دج</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white text-2xl font-extrabold py-6 px-8 rounded-lg hover:bg-yellow-600 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={submitted}
          >
            إرسال الطلب
          </button>
        </form>
      </div>

      {selectedImages.length > 0 && (
        <div className="md:w-1/3 mb-8 md:mb-0 flex-shrink-0">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
            الصور المختارة:
          </h3>
          <div className="flex flex-wrap gap-4 justify-center p-4 border border-gray-200 rounded-lg shadow-inner bg-gray-100">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 overflow-hidden rounded-lg shadow-md border border-gray-300"
              >
                <Image
                  src={image}
                  alt={`Selected Image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showConfirmation && <Confirmation resetForm={resetForm} />}
    </div>
  );
}
