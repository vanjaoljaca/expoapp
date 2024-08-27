# Repro for yarn link issue with eas build

This expo app references a local library folder

First confirm that it loads right without link:

```
yarn start
```

expected result in log on start up:

```
LOG  loading library result: {"n": 99}
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
LOG  loading library result: {"n": 99}
```

Then we build for phone & do an update

```
LOCAL_BUILD=true eas build --profile preview --platform ios
# modify library/index.js return value here
LOCAL_BUILD=true eas update --channel preview --platform=ios
```

Notice that update does not use the changed value. This worked on EAS 50 (TODO: double check this)
