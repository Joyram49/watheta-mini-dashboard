export const envConfig = {
  backendBaseUrl:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
    'https://68f9797cef8b2e621e7c2bea.mockapi.io/api/v1',
  devMode: process.env.NODE_ENV === 'development',
};
