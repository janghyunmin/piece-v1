import Constants from 'expo-constants'


const ENV: any = {
  development: {
    API_URL: "https://20igr2325g.apigw.ntruss.com/piece-dev/v1",
    WS_URL: "wss://dev-websocket.piece.run",
    WEBVIEW_URL: "https://dev.piece.run",
  },
  production: {
    API_URL: "https://sznt8bz7j9.apigw.ntruss.com/piece-prod/v1",
    WS_URL: "wss://websocket.piece.run",
    WEBVIEW_URL: "https://piece.run",
  },
}

export const getEnvVars = (env: any = Constants?.manifest?.releaseChannel) => {
  if (['development', 'production'].includes(env)) return ENV[env];
  return ENV.production;
  // if (__DEV__) return ENV.development;
  // else return ENV.production;
}
