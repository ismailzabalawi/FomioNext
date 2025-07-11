# Expo MVP Setup Guide

This guide will help you set up and run the Expo MVP project on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js 18+**: [Download Node.js](https://nodejs.org/)
2. **npm or yarn**: Comes with Node.js
3. **Expo CLI**: Install globally with `npm install -g @expo/cli`
4. **Git**: [Download Git](https://git-scm.com/)

For mobile development:
- **iOS Development**: Xcode (macOS only)
- **Android Development**: Android Studio

## Quick Start

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

*Note: We use `--legacy-peer-deps` to handle dependency conflicts during initial setup.*

### 2. Start Development Server

```bash
npm start
```

This will open the Expo Dev Tools in your browser.

### 3. Run on Different Platforms

#### iOS Simulator (macOS only)
```bash
npm run ios
```

#### Android Emulator
```bash
npm run android
```

#### Web Browser
```bash
npm run web
```

#### Physical Device
1. Install Expo Go app on your device
2. Scan the QR code from the terminal or Expo Dev Tools

## Project Structure

```
expo-mvp/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── assets/                # Static assets (icons, images)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Basic UI components (Button, Card)
│   │   └── error-boundary.tsx
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── theme/           # Theme and styling
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
└── __tests__/           # Test files
```

## Configuration

### Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your configuration:
   ```env
   APP_ENV=development
   API_BASE_URL=https://your-api.com
   ENABLE_ANALYTICS=true
   ```

### App Configuration

Update `app.json` for your specific app:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "bundleIdentifier": "com.yourcompany.yourapp",
    "package": "com.yourcompany.yourapp"
  }
}
```

## Development Workflow

### Code Quality

Run type checking:
```bash
npm run typecheck
```

Run linting:
```bash
npm run lint
```

Run tests:
```bash
npm test
```

### Adding New Dependencies

For Expo SDK packages:
```bash
npx expo install package-name
```

For npm packages:
```bash
npm install package-name
```

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**:
   ```bash
   npx expo start --clear
   ```

2. **Node modules issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

3. **iOS simulator not starting**:
   - Ensure Xcode is installed and command line tools are set up
   - Try `npx expo run:ios`

4. **Android emulator issues**:
   - Ensure Android Studio is properly set up
   - Check ANDROID_HOME environment variable
   - Try `npx expo run:android`

### Dependency Conflicts

If you encounter dependency conflicts:

1. Try installing with legacy peer deps:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Check for duplicate React versions:
   ```bash
   npm ls react
   ```

3. Use Expo's compatible versions:
   ```bash
   npx expo install --fix
   ```

## Building for Production

### Development Build
```bash
npx expo build
```

### Production Builds

#### iOS
```bash
npx expo build:ios
```

#### Android
```bash
npx expo build:android
```

### EAS Build (Recommended)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build for platforms:
   ```bash
   eas build --platform all
   ```

## Deployment

### Expo Updates (OTA)
```bash
npx expo publish
```

### App Stores

Follow Expo's guide for submitting to:
- [App Store](https://docs.expo.dev/submit/ios/)
- [Google Play](https://docs.expo.dev/submit/android/)

## Next Steps

1. **Customize the theme** in `src/theme/theme.ts`
2. **Add your API integration** in `src/utils/`
3. **Replace placeholder assets** in `assets/`
4. **Add authentication** using your preferred service
5. **Set up error tracking** (Sentry, Bugsnag, etc.)
6. **Configure push notifications**
7. **Add analytics** (Firebase, Amplitude, etc.)

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

If you encounter any issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Check Expo's community forums and Discord

Happy coding! 🚀