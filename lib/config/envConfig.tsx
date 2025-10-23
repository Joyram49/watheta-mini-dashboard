export const envConfig = {
  backendBaseUrl:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:3000/api',
  devMode: process.env.NODE_ENV === 'development',
};
