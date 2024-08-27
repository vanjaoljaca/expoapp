const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const isLocalBuild = process.env.LOCAL_BUILD === "true"; // You can set this environment variable in your local build script

console.log({ isLocalBuild });

const extraNodeModules = isLocalBuild
    ? {
        "library": path.resolve(
            __dirname + "/../library",
        ),
    }
    : {};

const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
});

if (isLocalBuild) {
    config.resolver.extraNodeModules = extraNodeModules;
    config.watchFolders = [path.resolve(__dirname + "/../library")];
}

module.exports = config;
