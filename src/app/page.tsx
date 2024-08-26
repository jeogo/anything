"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../public/OmniMart.svg";
import Form from "@/components/Form";

export default function Home() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const images: string[] = [
    "/images/1.svg",
    "/images/2.svg",
    "/images/3.svg",
    "/images/4.svg",
    "/images/5.svg",
  ];

  const pricePerUnit = 1900; // Price for one unit

  const toggleSelectImage = (image: string) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(image)
        ? prevSelected.filter((img) => img !== image)
        : [...prevSelected, image]
    );
  };

  // Function to calculate discount based on the number of items
  const calculateDiscount = (itemCount: number) => {
    switch (itemCount) {
      case 2:
        return 200;
      case 3:
        return 300;
      case 4:
        return 350;
      case 5:
        return 400;
      default:
        return 0;
    }
  };

  // Calculate the original price (without discount)
  const originalPrice = selectedImages.length * pricePerUnit;

  // Calculate the total price after applying discounts
  const totalPrice = originalPrice - calculateDiscount(selectedImages.length);

  return (
    <main
      dir="rtl"
      className="bg-gradient-to-b  min-h-screen font-sans text-browne"
    >
      {/* Navigation */}
      <nav className="bg-opacity-30 backdrop-blur-lg py-5 fixed w-full z-10">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-reverse space-x-2 text-browne">
            <Image src={Logo} width={80} height={80} alt="OmniMart Logo" />
            <div className="text-3xl font-extrabold ">OmniMart</div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-36 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight  drop-shadow-lg">
          اكتشف مجموعة مذهلة من الساعات الفاخرة
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-12  drop-shadow-md">
          انغمس في عالم من الأناقة والفخامة مع تشكيلتنا المختارة من الساعات
          المصممة بأدق المعايير لتلبية ذوقك الرفيع.
        </p>
      </section>

      {/* Product Showcase */}
      <section id="products" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center ">
          اختر ساعتك المفضلة
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => toggleSelectImage(image)}
            >
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={image}
                  alt={`صورة ${index + 1}`}
                  width={250} // Smaller image size
                  height={250} // Smaller image size
                  className={`w-full h-auto object-cover ${
                    selectedImages.includes(image)
                      ? "border-4 border-yellow-400"
                      : ""
                  }`}
                />
              </div>
              {selectedImages.includes(image) && (
                <div className="absolute top-2 right-2  text-purple-900 rounded-full w-8 h-8 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center ">لماذا تختارنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white text-brown-900 backdrop-blur-lg rounded-xl p-8 text-center shadow-2xl rounded-xl">
            <div className="text-6xl mb-6">🚚</div>
            <h3 className="text-2xl font-semibold mb-4 ">توصيل سريع</h3>
            <p className="text-lg">نضمن وصول منتجاتك في أسرع وقت ممكن</p>
          </div>
          <div className="bg-white text-brown-900 backdrop-blur-lg rounded-xl p-8 text-center shadow-2xl rounded-xl">
            <div className="text-6xl mb-6">💎</div>
            <h3 className="text-2xl font-semibold mb-4 ">جودة عالية</h3>
            <p className="text-lg">نقدم فقط أفضل المنتجات ذات الجودة العالية</p>
          </div>
          <div className="bg-white text-brown-900 backdrop-blur-lg rounded-xl p-8 text-center shadow-2xl rounded-xl">
            <div className="text-6xl mb-6">🛡️</div>
            <h3 className="text-2xl font-semibold mb-4">ضمان الرضا</h3>
            <p className="text-lg">
              رضاك هو أولويتنا، نضمن لك تجربة تسوق مميزة
            </p>
          </div>
        </div>
      </section>

      {/* Pass Selected Images and Total Price to the Form */}
      <Form
        selectedImages={selectedImages}
        totalPrice={totalPrice}
        originalPrice={originalPrice}
      />

      {/* Footer */}
      <footer className=" py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
              <h4 className="text-xl font-semibold mb-4">تواصل معنا</h4>
              <p>الهاتف: 123-456-7890</p>
              <p>البريد الإلكتروني: info@yourbrand.com</p>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <p>&copy; 2024 OmniMart. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
