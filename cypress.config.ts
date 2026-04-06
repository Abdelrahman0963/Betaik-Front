import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    // تحسين أداء الاختبارات
    setupNodeEvents(on, config) {
      // يمكن إضافة معالجات الأحداث هنا
    },

    // الملفات والإعدادات
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    // تحسينات الأداء
    pageLoadTimeout: 30000, // 30 ثانية للراوتات الثقيلة
    requestTimeout: 15000, // 15 ثانية لـ API Calls
    responseTimeout: 15000, // 15 ثانية للـ Response

    // إعدادات التسجيل والتقارير
    video: false, // تعطيل الفيديو توفيراً للموارد
    videoOnFailOnly: true, // فيديو عند الفشل فقط
    screenshotOnRunFailure: true, // لقطة شاشة عند الفشل

    // إعادة المحاولة
    retries: {
      runMode: 1, // محاولة واحدة إعادة في الراوتات الثقيلة
      openMode: 0, // لا إعادة محاولة في الوضع التفاعلي
    },

    // المتصفحات المدعومة
    browser: ['chrome', 'firefox', 'edge'],

    // إعدادات الشبكة
    numTestsKeptInMemory: 0, // تقليل الذاكرة

    // مسارات الملفات
    downloadsFolder: "cypress/downloads",
    fixturesFolder: "cypress/fixtures",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    // إعدادات أخرى
    chromeWebSecurity: false, // لتسهيل الاختبارات
    viewportWidth: 1280,
    viewportHeight: 720,

    // إعدادات الـ Reporter
    reporter: "spec",
    reporterOptions: {
      mochaFile: "cypress/results/[hash].json",
      toConsole: true,
    },
  },

  // إعدادات إضافية
  projectId: "your-project-id", // اختياري إذا كنت تستخدم Cypress Cloud
})

