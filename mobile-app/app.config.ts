import 'dotenv/config'
import { ConfigContext, ExpoConfig } from 'expo/config'
// import { ANDROID_GOOGLE_MAPS_API_KEY, IOS_GOOGLE_MAPS_API_KEY, IOS_STRIPE_MERCHANT_ID } from '@env'

export default ({config}: ConfigContext): ExpoConfig => ({
    name: 'divvly',
    slug: 'divvly',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    notification: {
      icon: './assets/images/icon.png',
    },
    scheme: 'divvly',
    userInterfaceStyle: 'automatic',
    plugins: [
      'expo-apple-authentication',
      '@logrocket/react-native',
      [
        'expo-image-picker',
        {
          photosPermission: 'Divvly uses yor photos for profile verification.',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 33,
          },
        },
      ],
      [
        'expo-location',
        {
          locationPermission: 'Divvly uses your location, to track host vehicles.',
        },
      ],
      [
        '@stripe/stripe-react-native',
        {
          merchantIdentifier: process.env.IOS_STRIPE_MERCHANT_ID,
          enableGooglePay: false,
        },
      ],
    ],
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#000000',
      },
      config: {
        googleMaps: {
          apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY,
        },
      },
      package: 'com.niebex.divvly',
      googleServicesFile: './google-services.json',
      versionCode: 22,
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    extra: {
      eas: {
        projectId: '66e442df-c84d-468f-8c52-f40c8e3902b5',
      },
    },
    owner: 'niebex',
});
