export const log = (...args: any[]) => {
  const appConfig = useAppConfig();

  if (appConfig.debug) {
    console.log(...args);
  }
};
