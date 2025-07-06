import React from "react";

const termsContent = [
  {
    title: "Introduction / المقدمة",
    en: "This Privacy Policy explains how Olive Stocks Ltd (Company No. 16477237, registered in England and Wales) collects, uses, and protects your personal information when you use our website or mobile app.",
    ar: "توضح سياسة الخصوصية هذه كيف تقوم شركة Olive Stocks Ltd (رقم الشركة 16477237، والمسجلة في إنجلترا وويلز) بجمع واستخدام وحماية معلوماتك الشخصية عند استخدامك لموقعنا أو تطبيق الهاتف المحمول.",
  },
  {
    title: "What Data We Collect / ما البيانات التي نجمعها",
    en: "We only collect basic personal data needed to provide you access to the platform, such as your name, email address, and login credentials.",
    ar: "نقوم بجمع بيانات شخصية أساسية فقط لتوفير وصولك إلى المنصة، مثل اسمك، عنوان بريدك الإلكتروني، وبيانات تسجيل الدخول.",
  },
  {
    title: "How We Use Your Data / كيف نستخدم بياناتك",
    en: "Your data is used solely to manage your account and provide access to Olive Stocks features. We do not sell or rent your personal information.",
    ar: "تُستخدم بياناتك فقط لإدارة حسابك وتوفير الوصول إلى ميزات Olive Stocks. نحن لا نبيع أو نؤجر معلوماتك الشخصية.",
  },
  {
    title: "Cookies and Tracking Technologies / ملفات تعريف الارتباط وتقنيات التتبع",
    en: "We use cookies to enhance your experience. These may include session cookies or analytics cookies when integrated (e.g., Google Analytics).",
    ar: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. قد تشمل هذه ملفات تعريف الجلسة أو ملفات التحليل عند الدمج (مثل Google Analytics).",
  },
  {
    title: "Sharing Your Information / مشاركة معلوماتك",
    en: "We do not share your personal data with third parties except trusted services like Stripe for payment processing, and only as necessary.",
    ar: "نحن لا نشارك بياناتك الشخصية مع أطراف ثالثة إلا مع خدمات موثوقة مثل Stripe لمعالجة المدفوعات، وفقط عند الحاجة.",
  },
  {
    title: "Data Retention / الاحتفاظ بالبيانات",
    en: "We retain your data only as long as necessary for the purpose of providing our services or as required by law.",
    ar: "نحتفظ ببياناتك فقط طالما كان ذلك ضروريًا لغرض تقديم خدماتنا أو كما هو مطلوب بموجب القانون.",
  },
  {
    title: "User Rights / حقوق المستخدم",
    en: "You have the right to access, correct, or delete your personal data. Contact us at any time to exercise your rights.",
    ar: "لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. يمكنك الاتصال بنا في أي وقت لممارسة حقوقك.",
  },
  {
    title: "Data Security / أمان البيانات",
    en: "We implement security measures to protect your data from unauthorized access or misuse.",
    ar: "نقوم بتطبيق تدابير أمنية لحماية بياناتك من الوصول غير المصرح به أو سوء الاستخدام.",
  },
  {
    title: "Children’s Privacy / خصوصية الأطفال",
    en: "Our services are not intended for users under 18 years old. We do not knowingly collect data from children.",
    ar: "خدماتنا غير مخصصة للمستخدمين الذين تقل أعمارهم عن 18 عامًا. ولا نقوم بجمع بيانات من الأطفال عن قصد.",
  },
  {
    title: "Third-Party Services / الخدمات الخارجية",
    en: "We may use trusted third-party tools like Stripe or Google Analytics. These services have their own privacy policies.",
    ar: "قد نستخدم أدوات خارجية موثوقة مثل Stripe أو Google Analytics. وتخضع هذه الخدمات لسياسات الخصوصية الخاصة بها.",
  },
  {
    title: "Changes to this Policy / التغييرات على هذه السياسة",
    en: "We may update this Privacy Policy from time to time. Please review it regularly for any changes.",
    ar: "يجوز لنا تحديث سياسة الخصوصية هذه من وقت لآخر. يرجى مراجعتها بانتظام لأي تغييرات.",
  },
  {
    title: "Contact Information / معلومات الاتصال",
    en: "If you have questions about this Privacy Policy, contact us at: info@olivestocks.com",
    ar: "إذا كانت لديك أسئلة حول سياسة الخصوصية هذه، يمكنك الاتصال بنا على: info@olivestocks.com",
  },
];


const Page = () => {
  return (
    <div className="my-16 container mx-auto">
      <h1 className="text-4xl font-bold text-green-400">
        Olive Stocks – Privacy Policy
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
