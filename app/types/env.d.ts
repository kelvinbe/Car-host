declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production' | 'testing'
    /**
     * The current phase of the page
     * 
     * @note this will determine if the page will get rendered or a placeholder will be shown
     * 
     * @default "ph1"
     * 
     * 
     */
    NEXT_PUBLIC_CURRENT_PHASE: 'ph1' | 'ph1.5' | 'ph2'
    NEXT_PUBLIC_apiKey: string
    NEXT_PUBLIC_appId: string
    NEXT_PUBLIC_messagingSenderId: string
    NEXT_PUBLIC_storageBucket: string
    NEXT_PUBLIC_projectId: string
    NEXT_PUBLIC_authDomain: string
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string
    NEXT_PUBLIC_API_DOMAIN: string
    NEXT_PUBLIC_LOGROCKET_APP_ID: string
    NEXT_PUBLIC_TRACKING_SERVICE: string
  }
}