import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "أومني مارت - اكتشف الساعات الفاخرة",
  description:
    "استكشف مجموعة مذهلة من الساعات الفاخرة في أومني مارت. انغمس في عالم من الأناقة والرقي مع تشكيلتنا المختارة بعناية، واستفد من الخصومات الحصرية على كل منتج إضافي تشتريه. ابدأ رحلتك نحو الأناقة الآن!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/OmniMart.svg" sizes="any" />
        {/* يمكن إضافة أحجام أو صيغ أخرى إذا لزم الأمر */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
