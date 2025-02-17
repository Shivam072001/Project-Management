export const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];

  if (value) {
    return value;
  }

  if (defaultValue) {
    return defaultValue;
  }

  throw new Error(`Missing environment variable: ${key}`);
};
