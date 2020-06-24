## Setup

Rename **.env.example** to **.env** and add the [API](https://github.com/jeann47/CarTalk-api) base url, a reactotron host if debbuging and you [Google Api Key](https://developers.google.com/maps/documentation/javascript/get-api-key).<p/>
You also need to add the [Google Api Key](https://developers.google.com/maps/documentation/javascript/get-api-key) at **/android/app/src/main/AndroidManifest.xml** *at line 20*

This app was not tested for IOS, but you can run at any android emulator with Google Services support and in your own phone following this [tutorial](https://reactnative.dev/docs/running-on-device)

Run [Yarn](https://classic.yarnpkg.com/lang/en/) then
```
yarn run android

yarn start
```

if needed add the flag *--reset-cache* after start to clear device cache

### Notes

- [ ] Missing Logo and visual identity
- [ ] Still not ready for production
- [ ] Need to be refactored to typescript react

### Assets used

- [React Navigation](https://reactnavigation.org)<p/>
- [React Native Geolocation](https://github.com/react-native-community/react-native-geolocation)<p/>
- [Axios](https://github.com/axios/axios)<p/>
- [React Native Contacts](https://github.com/morenoh149/react-native-contacts)<p/>
- [DotEnv](https://github.com/zetachang/react-native-dotenv)<p/>
- [React Native Maps](https://github.com/react-native-community/react-native-maps)<p/>
- [React Native Popups](https://github.com/jacklam718/react-native-modals/blob/master/README.md)<p/>
- [Vector Icons](https://github.com/oblador/react-native-vector-icons)<p/>
- [Reactotron](https://github.com/infinitered/reactotron) > debug only<p/>
- [Redux](https://redux.js.org)<p/>
- [Styled Components](https://styled-components.com)<p/>
- [Socket.Io](https://socket.io)<p/>

#### linting
[eslint](https://eslint.org) and [prettier](https://prettier.io)
