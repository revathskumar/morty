declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TEST_MODE: string | undefined;
    }
  }
}
