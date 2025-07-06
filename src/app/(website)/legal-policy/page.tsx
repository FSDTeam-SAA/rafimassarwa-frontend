import React from "react";

const termsContent = [
  // === Cookie Policy ===
  {
    title: "Introduction / المقدمة – سياسة ملفات تعريف الارتباط",
    en: "This Cookie Policy explains how Olive Stocks uses cookies and similar technologies on our website and mobile app.",
    ar: "توضح سياسة ملفات تعريف الارتباط هذه كيف تستخدم Olive Stocks ملفات تعريف الارتباط والتقنيات المشابهة على موقعنا وتطبيقنا.",
  },
  {
    title: "What Are Cookies? / ما هي ملفات تعريف الارتباط؟",
    en: "Cookies are small text files stored on your device that help us recognize you and improve your experience.",
    ar: "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك وتساعدنا على التعرف عليك وتحسين تجربتك.",
  },
  {
    title: "Types of Cookies We Use / أنواع ملفات تعريف الارتباط التي نستخدمها",
    en: "We use session cookies, preference cookies, and analytics cookies (e.g., from Google Analytics).",
    ar: "نستخدم ملفات تعريف الجلسة وملفات التفضيلات وملفات التحليل (مثل Google Analytics).",
  },
  {
    title: "Managing Cookies / إدارة ملفات تعريف الارتباط",
    en: "You can control or delete cookies through your browser settings at any time.",
    ar: "يمكنك التحكم في ملفات تعريف الارتباط أو حذفها من خلال إعدادات المتصفح في أي وقت.",
  },
  {
    title: "Changes to This Policy / التغييرات على هذه السياسة",
    en: "We may update this Cookie Policy occasionally. Please check this page regularly.",
    ar: "قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من حين لآخر. يرجى مراجعة هذه الصفحة بانتظام.",
  },

  // === Subscription & Billing Terms ===
  {
    title: "Subscription & Billing – Overview / نظرة عامة – الاشتراك والفوترة",
    en: "Olive Stocks offers subscription plans with yearly billing only: Free, Premium ($199/year), and Ultimate ($399/year).",
    ar: "تقدم Olive Stocks خطط اشتراك مع فواتير سنوية فقط: مجانية، بريميوم (199 دولارًا سنويًا)، وألتيميت (399 دولارًا سنويًا).",
  },
  {
    title: "Payment Method / طريقة الدفع",
    en: "Payments are processed securely through Stripe. We do not store payment information on our servers.",
    ar: "تتم معالجة المدفوعات بشكل آمن عبر Stripe. نحن لا نخزن معلومات الدفع على خوادمنا.",
  },
  {
    title: "Auto-Renewal / التجديد التلقائي",
    en: "Subscriptions renew automatically unless canceled before the next billing cycle.",
    ar: "تتجدد الاشتراكات تلقائيًا ما لم يتم الإلغاء قبل دورة الفوترة التالية.",
  },
  {
    title: "Upgrades and Downgrades / الترقية والتخفيض",
    en: "You may upgrade or downgrade your plan at any time. New billing rates apply immediately or at the next cycle.",
    ar: "يمكنك الترقية أو التخفيض في أي وقت. تسري الأسعار الجديدة فورًا أو في دورة الفوترة التالية.",
  },
  {
    title: "Billing Issues / مشاكل الفوترة",
    en: "If you encounter a billing issue, contact us immediately at billing@olivestocks.com.",
    ar: "إذا واجهت مشكلة في الفوترة، يرجى التواصل معنا فورًا على billing@olivestocks.com.",
  },

  // === Refund Policy ===
  {
    title: "No Refund Policy / سياسة عدم الاسترداد",
    en: "We do not offer refunds on subscriptions once the billing cycle has started. Please evaluate the Free plan before upgrading.",
    ar: "نحن لا نقدم استردادات للاشتراكات بعد بدء دورة الفوترة. يرجى تجربة الخطة المجانية قبل الترقية.",
  },
  {
    title: "Exceptions / الاستثناءات",
    en: "Refunds may be considered in exceptional cases such as technical errors or duplicate payments.",
    ar: "قد يتم النظر في الاسترداد في حالات استثنائية مثل الأخطاء التقنية أو المدفوعات المكررة.",
  },
  {
    title: "How to Request / كيفية تقديم الطلب",
    en: "To request a refund, email support@olivestocks.com within 7 days of the issue.",
    ar: "لطلب استرداد، أرسل بريدًا إلكترونيًا إلى support@olivestocks.com خلال 7 أيام من المشكلة.",
  },

  // === Disclaimer ===
  {
    title: "Informational Only / لأغراض إعلامية فقط",
    en: "All content on Olive Stocks is for informational purposes only. It does not constitute investment advice.",
    ar: "جميع المحتويات على Olive Stocks لأغراض إعلامية فقط ولا تُعد نصيحة استثمارية.",
  },
  {
    title: "No Liability / عدم المسؤولية",
    en: "We are not responsible for any losses incurred from decisions based on our content.",
    ar: "لسنا مسؤولين عن أي خسائر ناتجة عن قرارات مبنية على محتوياتنا.",
  },
  {
    title: "Seek Professional Advice / استشر مختصًا دائمًا",
    en: "Always consult a licensed financial advisor before making investment decisions.",
    ar: "استشر دائمًا مستشارًا ماليًا مرخصًا قبل اتخاذ قرارات استثمارية.",
  },

  // === App Permissions Notice ===
  {
    title: "Permissions Overview / نظرة عامة على الأذونات",
    en: "Our mobile app may request access to certain features (e.g., internet, notifications) to function properly.",
    ar: "قد يطلب تطبيق الهاتف المحمول الخاص بنا الوصول إلى ميزات معينة (مثل الإنترنت، الإشعارات) للعمل بشكل صحيح.",
  },
  {
    title: "Data Collection / جمع البيانات",
    en: "We do not collect or share your private data through mobile permissions.",
    ar: "نحن لا نجمع أو نشارك بياناتك الخاصة من خلال أذونات التطبيق.",
  },
  {
    title: "How to Manage / كيفية الإدارة",
    en: "You can manage app permissions through your device settings at any time.",
    ar: "يمكنك إدارة أذونات التطبيق من خلال إعدادات جهازك في أي وقت.",
  },
];

const Page = () => {
  return (
    <div className="my-16 container mx-auto">
      <h1 className="text-4xl font-bold text-green-400">
        Olive Stocks – Legal Policies
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
