export default () => ({
  "expo": {
    "name": "PIECE",
    // "owner": "buysellstandards",  defualt
    // "owner": "team-piece", 
    "slug": "piece",
    "description": "piece",
    "version": "1.1.9",
    "platforms": ["android", "ios"],
    "backgroundColor": "#FFFFFF",
    "primaryColor": "#4575F5",
    "icon": "./assets/app_icon.png",
    "plugins": [
      [
        "react-native-appsflyer",{}
      ]
    ],
    "scheme": "piece",
    "orientation": "portrait",
    "notification": {
      "icon": "./assets/app_icon.png",
      "color": "#FFFFFF"
    },
    "updates" : {
      "fallbackToCacheTimeout" : 0,
      "enabled" : false,
    },
    "ios": {
      "bundleIdentifier": "run.piece.dev",
      "buildNumber": "1.1.57",
      "config": {
        "usesNonExemptEncryption": false
      },
      "infoPlist": {
        "NSFaceIDUsageDescription": "생체인증을 사용하기 위해서는 생체인증 사용권한을 허용해야 합니다."
      }
    },
    "android": {
      "useNextNotificationsApi": true,
      "package": "run.piece.dev",
      "versionCode": 27,
      "permissions": [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "NOTIFICATIONS",
        "USE_BIOMETRIC",
        "USE_FINGERPRINT"
      ]
    },
  }
});