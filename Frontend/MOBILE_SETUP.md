# دليل إعداد تطبيق Smart Parking AI للموبايل

تم تحويل التطبيق من تطبيق ويب إلى تطبيق موبايل باستخدام Capacitor.

## المتطلبات الأساسية

### للـ iOS:
- macOS
- Xcode (آخر إصدار)
- CocoaPods: `sudo gem install cocoapods`

### للـ Android:
- Android Studio
- Java Development Kit (JDK)
- Android SDK

## خطوات الإعداد

### 1. تثبيت المتطلبات

```bash
npm install
```

### 2. بناء التطبيق

```bash
npm run build
```

### 3. إضافة منصات الموبايل

#### إضافة iOS:
```bash
npm run cap:add ios
```

#### إضافة Android:
```bash
npm run cap:add android
```

### 4. مزامنة الكود مع المنصات

```bash
npm run cap:sync
```

### 5. فتح المشروع في Xcode/Android Studio

#### iOS:
```bash
npm run cap:open ios
```
ثم في Xcode، اختر جهاز أو محاكي واشغل التطبيق.

#### Android:
```bash
npm run cap:open android
```
ثم في Android Studio، اختر جهاز أو محاكي واشغل التطبيق.

## الأوامر المتاحة

- `npm run dev` - تشغيل التطبيق في وضع التطوير (ويب)
- `npm run build` - بناء التطبيق للإنتاج
- `npm run cap:sync` - مزامنة التغييرات مع منصات الموبايل
- `npm run cap:open ios` - فتح مشروع iOS في Xcode
- `npm run cap:open android` - فتح مشروع Android في Android Studio
- `npm run cap:run ios` - بناء وتشغيل على iOS
- `npm run cap:run android` - بناء وتشغيل على Android

## الميزات المضافة للموبايل

1. **دعم Safe Areas**: التطبيق يدعم المناطق الآمنة للأجهزة ذات الشق (Notch)
2. **Status Bar**: تكوين شريط الحالة ليتناسب مع التطبيق
3. **Splash Screen**: شاشة بدء مخصصة
4. **Touch Optimization**: تحسينات للتفاعلات باللمس
5. **Keyboard Handling**: معالجة أفضل للوحة المفاتيح
6. **PWA Support**: دعم Progressive Web App

## ملاحظات مهمة

- بعد أي تغيير في الكود، قم بتشغيل `npm run build` ثم `npm run cap:sync`
- الأيقونات والشاشات الافتتاحية موجودة في مجلد `ios/App/App/Assets.xcassets` و `android/app/src/main/res`
- يمكنك تخصيص `capacitor.config.ts` لتغيير إعدادات التطبيق

## استكشاف الأخطاء

### مشاكل في iOS:
- تأكد من تثبيت CocoaPods: `cd ios/App && pod install`
- تأكد من فتح `ios/App/App.xcworkspace` وليس `App.xcodeproj`

### مشاكل في Android:
- تأكد من تثبيت Android SDK و Java JDK
- تحقق من إعدادات Gradle في Android Studio

