export const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV; // can be undefined in test environments

export const port = process.env.PORT || 8080;
export const rootDomain = isDev ? `http://localhost:${port}` : null;