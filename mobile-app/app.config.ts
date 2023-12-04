import 'dotenv/config'
import { ConfigContext, ExpoConfig } from 'expo/config'
// import { ANDROID_GOOGLE_MAPS_API_KEY, IOS_GOOGLE_MAPS_API_KEY, IOS_STRIPE_MERCHANT_ID } from '@env'

export default ({config}: ConfigContext): ExpoConfig => ({
  "name": "gari",
  "slug": "eats",
  "version": "1.0.0",
  "platforms": [
    "ios",
    "android",
    "web"
  ],
  "extra": {
    "eas": {
      "projectId": "19ec7a54-cf2f-477a-bd1d-d8330086d0c0"
    }
  },
  "android": {
    "versionCode": 2,
    "package": "com.kelvinkb.gari"
  }
    
});














