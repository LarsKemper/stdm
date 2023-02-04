export const __prod__ = process.env.NODE_ENV === 'production';
export const serverUrl = process.env.SERVER_URL;
export const isServer = typeof window === 'undefined';
export const apiVersion = process.env.API_VERSION;
