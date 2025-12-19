## 📱 Mobile App

A parking management mobile application built with React and Vite, converted to native iOS and Android apps using Capacitor. The app helps users find, book, and manage parking spots with a modern, user-friendly interface.

**Supported Platforms:**
- iOS (iPhone, iPad)
- Android (phones and tablets)
- Web (PWA)

### Quick Start

1. Install dependencies:
```bash
npm install
```

2. For web development:
```bash
npm run dev
```

3. For mobile app setup, see [MOBILE_SETUP.md](./MOBILE_SETUP.md) for detailed instructions.

### Mobile App Features

- ✅ Native iOS and Android support
- ✅ Safe area support for notched devices
- ✅ Optimized touch interactions
- ✅ Status bar customization
- ✅ Splash screen
- ✅ PWA support

## Project Structure

```
├── src/                 # React application source code
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen/page components
│   ├── styles/          # Global styles
│   └── App.tsx         # Main app component
├── android/             # Android native app files
├── ios/                 # iOS native app files
├── public/              # Static assets
└── capacitor.config.ts  # Capacitor configuration
```

## Development

For mobile app development, follow the detailed instructions in [MOBILE_SETUP.md](./MOBILE_SETUP.md).
  