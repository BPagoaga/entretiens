/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />


interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_VERSION: number;
  readonly VITE_ENV_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
