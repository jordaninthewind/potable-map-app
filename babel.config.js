module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@app": "./src",
            "@assets": "./assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@features": "./src/features",
            "@navigation": "./src/navigation",
            "@redux": "./src/redux",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@styles": "./src/styles",
            "@utils": "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
