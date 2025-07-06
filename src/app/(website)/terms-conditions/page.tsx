import React from "react";

const termsContent = [
  {
    title: "Acceptance of Terms / قبول الشروط",
    en: "By accessing or using Olive Stocks via our website or mobile application, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services.",
    ar: "من خلال الوصول إلى موقع Olive Stocks أو تطبيق الهاتف المحمول، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق، يُرجى عدم استخدام خدماتنا.",
  },
  {
    title: "Eligibility / الأهلية",
    en: "You must be at least 18 years old to use Olive Stocks. By using our platform, you confirm that you meet this requirement.",
    ar: "يجب أن تكون تبلغ من العمر ١٨ عامًا على الأقل لاستخدام Olive Stocks. باستخدامك لمنصتنا، فأنت تقر بأنك تستوفي هذا الشرط.",
  },
  {
    title: "Account Registration and Security / تسجيل الحساب والأمان",
    en: "You are responsible for maintaining the confidentiality of your account login information and for all activities under your account. You agree to notify us immediately of any unauthorized use.",
    ar: "أنت مسؤول عن الحفاظ على سرية معلومات تسجيل الدخول لحسابك وعن جميع الأنشطة التي تتم من خلاله. وتوافق على إخطارنا فورًا بأي استخدام غير مصرح به.",
  },
  {
    title: "Subscription and Payments / الاشتراك والمدفوعات",
    en: "Some features of Olive Stocks are available only to paid subscribers. By subscribing, you agree to our [Subscription & Billing Terms].",
    ar: "بعض ميزات Olive Stocks متاحة فقط للمشتركين المدفوعين. من خلال الاشتراك، فإنك توافق على [شروط الاشتراك والدفع].",
  },
  {
    title: "Intellectual Property / الملكية الفكرية",
    en: "All content on Olive Stocks, including logos, data, design, and software, is owned by Olive Stocks Ltd or its licensors. You may not copy, distribute, or modify any part without permission.",
    ar: "جميع المحتويات على Olive Stocks، بما في ذلك الشعارات والبيانات والتصميمات والبرمجيات، مملوكة لشركة Olive Stocks Ltd أو الجهات المرخصة لها. لا يجوز لك نسخ أو توزيع أو تعديل أي جزء دون إذن.",
  },
  {
    title: "Financial Information Disclaimer / إخلاء المسؤولية عن المعلومات المالية",
    en: "Olive Stocks provides financial data and insights for informational purposes only. It does not constitute financial advice or recommendations. You are solely responsible for any investment decisions.",
    ar: "توفر Olive Stocks بيانات ورؤى مالية لأغراض إعلامية فقط. ولا تُعد نصيحة مالية أو توصية. أنت وحدك المسؤول عن أي قرارات استثمارية تقوم بها.",
  },
  {
    title: "User Conduct / سلوك المستخدم",
    en: "You agree not to misuse the platform, engage in fraudulent behavior, or post illegal content. We reserve the right to suspend or terminate your account for violations.",
    ar: "توافق على عدم إساءة استخدام المنصة أو الانخراط في سلوك احتيالي أو نشر محتوى غير قانوني. ونحتفظ بالحق في تعليق أو إنهاء حسابك في حال حدوث انتهاكات.",
  },
  {
    title: "Limitation of Liability / تحديد المسؤولية",
    en: "Olive Stocks is not liable for any indirect, incidental, or consequential damages arising from the use of the platform.",
    ar: "لا تتحمل Olive Stocks المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام المنصة.",
  },
  {
    title: "Governing Law / القانون الحاكم",
    en: "These Terms are governed by the laws of England and Wales. Company No. 16477237, incorporated on 27 May 2025 in Cardiff.",
    ar: "تخضع هذه الشروط لقوانين إنجلترا وويلز. رقم الشركة 16477237، تم تسجيلها بتاريخ 27 مايو 2025 في كارديف.",
  },
  {
    title: "Changes to Terms / التعديلات على الشروط",
    en: "We may update these Terms from time to time. Continued use of the platform means you accept the updated terms.",
    ar: "يجوز لنا تحديث هذه الشروط من وقت لآخر. استمرارك في استخدام المنصة يعني قبولك للشروط المحدثة.",
  },
];

const Page = () => {
  return (
    <div className="my-16 container mx-auto">
      <h1 className="text-4xl font-bold text-green-400">
        Olive Stocks – Terms of Use
      </h1>

      {termsContent.map((section, index) => (
        <div key={index} className="mt-10">
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <p className="lg:max-w-4xl my-2 text-gray-600">{section.en}</p>
          <p className="lg:max-w-4xl text-gray-600">{section.ar}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
