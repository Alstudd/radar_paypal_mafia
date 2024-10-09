export default {
  expo: {
    name: "AntiMatrix",
    slug: "radar_paypal_mafia",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/AntiMatrix.png",
    scheme: "antimatrix",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/AntiMatrix.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "radar-paypal-mafia",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/AntiMatrix.png",
        backgroundColor: "#ffffff",
      },
      package: "com.alstudd.radar_paypal_mafia",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      bundler: "metro",
      output: "server",
      favicon: "./assets/images/AntiMatrix.png",
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://radar_paypal_mafia.dev/",
        },
      ],
      ["@react-native-google-signin/google-signin"],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: "https://radar_paypal_mafia.dev/",
      },
      eas: {
        projectId: "abf90122-58b8-49b8-9f11-3da269f6e4f8",
      },
    },
  },
};
