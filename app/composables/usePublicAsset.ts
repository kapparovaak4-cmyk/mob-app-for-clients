export const usePublicAsset = (path: string) => {
  const baseURL = useRuntimeConfig().app.baseURL;
  return `${baseURL}${path.replace(/^\/+/, '')}`;
};