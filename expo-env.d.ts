/// <reference types="expo/types" />

// Declare global environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: string;
    APP_NAME: string;
    APP_VERSION: string;
    API_BASE_URL: string;
    API_TIMEOUT: string;
    ENABLE_ANALYTICS: string;
    ENABLE_NOTIFICATIONS: string;
    ENABLE_CRASHLYTICS: string;
    DEV_MODE: string;
    DEBUG_LOGS: string;
  }
}