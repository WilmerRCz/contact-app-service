declare global {
  namespace NodeJS {
    interface PreoccesEnv {
      NODE_ENV: 'development' | 'production',
      PORT?: number,
      MONGO_URI: string
    }
  }
}
