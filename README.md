# yavascript app template

template repo for building and distributing cross-platform programs built using yavascript

## usage

- change "my-app" in `meta/APP_NAME.js` to whatever you want the output binary file to be called
- edit src/index.ts as desired (you can add other files too and import them)
- run "npm install && npm run build"
- output binaries for all platforms will be in the "dist" folder

## notes

- A "LICENSE" file gets generated as part of the build, which gets put in the .tar.gz files for each platform. It includes license info for yavascript, its dependencies, and your app. If you use third-party code in your app that requires attribution and/or license text inclusion as part of its license, you should edit `meta/build.js` to include the necessary license info in the generated "LICENSE" file.

## license

the code in this repo is public domain
