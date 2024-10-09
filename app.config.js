export default {
    "expo": {
      "name": "AntiMatrix",
      "slug": "AntiMatrix",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/images/AntiMatrix.png",
      "scheme": "antimatrix",
      "userInterfaceStyle": "automatic",
      "splash": {
        "image": "./assets/images/AntiMatrix.png",
        "resizeMode": "cover",
        "backgroundColor": "#ffffff"
      },
      "ios": {
        "supportsTablet": true,
        "bundleIdentifier": "radar-paypal-mafia"
      },
      "android": {
        "adaptiveIcon": {
          "foregroundImage": "./assets/images/AntiMatrix.png",
          "backgroundColor": "#ffffff"
        },
        "package": "com.alstudd.radar_paypal_mafia",
        "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
      },
      "web": {
        "bundler": "metro",
        "output": "server",
        "favicon": "./assets/images/AntiMatrix.png"
      },
      "plugins": [
        [
          "expo-router",
          {
            "origin": "https://radar_paypal_mafia.dev/"
          }
        ],
        [
          "@react-native-google-signin/google-signin"
        ]
      ],
      "experiments": {
        "typedRoutes": true
      },
      "extra": {
        "router": {
          "origin": "https://radar_paypal_mafia.dev/"
        },
        "eas": {
          "projectId": "3cbe5c9c-8ec0-4dbc-a2dc-54788982f469"
        }
      }
    }
  }
  