# PIECE EXPO APP

## Install Expo Cli
```
npm i -g expo-cli
```

## Login Expo
```
expo login
```

## Install Package 
```
yarn install
```


## Start Project
```
expo start
```


## Build Project
`release-channel` 옵션에 따라 호출하는 API가 달라집니다. 
```
# development
expo build:ios --release-channel development
expo build:android --release-channel development

# production
expo build:ios --release-channel production
expo build:android --release-channel production
```
