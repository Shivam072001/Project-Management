import { getEnv } from "../utils/get-env";

interface EnvConfig {
  VITE_API_BASE_URL: string;
  NODE_ENV: string;
}

const envConfig = (): EnvConfig => ({
  VITE_API_BASE_URL: getEnv("VITE_API_BASE_URL", "http://localhost:8000"), // Default to localhost if not set
  NODE_ENV: getEnv("NODE_ENV", "development"),
});

export const config = envConfig();
