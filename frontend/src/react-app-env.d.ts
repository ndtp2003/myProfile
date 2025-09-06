/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_NAME: string;
    REACT_APP_VERSION: string;
    REACT_APP_ENVIRONMENT: 'development' | 'production';
    REACT_APP_GA_TRACKING_ID?: string;
    REACT_APP_ENABLE_ANALYTICS: string;
    REACT_APP_ENABLE_DEBUG: string;
  }
}
