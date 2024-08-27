# Repro for yarn link issue with eas build

This expo app references a local library folder

First confirm that it loads right without link:

```
yarn start
```

expected result in log on start up:

```
LOG  loading library result: {"library": {"add": [Function add]}}
```

Then exit, create the link, and retry:

```
cd library
yarn link
cd ../expoapp
yarn link library
LOCAL_BUILD=true yarn start -c
```

(LOCAL_BUILD is consumed in metro.config.js to ensure the link functions as expected)

confirm it works because log output from expoapp\_layout.tsx:9

```
LOG  loading library result: {"library": {"add": [Function add]}}
```

Build for phone also works fine:

```
LOCAL_BUILD=true eas build --profile preview --platform ios
```

However, trying to UPDATE for ios fails!!

```
LOCAL_BUILD=true eas update --channel preview --platform=ios
```

(can't comment on android)
