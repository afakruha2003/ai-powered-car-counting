# Smart Parking AI Mobile App Setup Guide

The application has been converted from a web app to a mobile app using Capacitor.

## System Requirements

### For iOS:
- macOS
- Xcode (latest version)
- CocoaPods: `sudo gem install cocoapods`

### For Android:
- Android Studio
- Java Development Kit (JDK)
- Android SDK

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Application

```bash
npm run build
```

### 3. Add Mobile Platforms

#### Add iOS:
```bash
npm run cap:add ios
```

#### Add Android:
```bash
npm run cap:add android
```

### 4. Sync Code with Platforms

```bash
npm run cap:sync
```

### 5. Open Project in Xcode/Android Studio

#### iOS:
```bash
npm run cap:open ios
```
Then in Xcode, select a device or emulator and run the app.

#### Android:
```bash
npm run cap:open android
```
Then in Android Studio, select a device or emulator and run the app.

## Available Commands

- `npm run dev` - Run the app in development mode (web)
- `npm run build` - Build the app for production
- `npm run cap:sync` - Sync changes with mobile platforms
- `npm run cap:open ios` - Open iOS project in Xcode
- `npm run cap:open android` - Open Android project in Android Studio
- `npm run cap:run ios` - Build and run on iOS
- `npm run cap:run android` - Build and run on Android

## Mobile Features Added

1. **Safe Areas Support**: The app supports safe areas for devices with notches
2. **Status Bar**: Status bar is properly configured to match the app
3. **Splash Screen**: Customized startup screen
4. **Touch Optimization**: Improvements for touch interactions
5. **Keyboard Handling**: Better handling for virtual keyboard
6. **PWA Support**: Progressive Web App support

## Important Notes

- After any code changes, run `npm run build` followed by `npm run cap:sync`
- Icons and splash screens are located in `ios/App/App/Assets.xcassets` and `android/app/src/main/res` directories
- You can customize `capacitor.config.ts` to change app settings

## Troubleshooting

### iOS Issues:
- Make sure CocoaPods is installed: `cd ios/App && pod install`
- Open `ios/App/App.xcworkspace`, not `App.xcodeproj`

### Android Issues:
- Make sure Android SDK and Java JDK are installed
- Check Gradle settings in Android Studio

