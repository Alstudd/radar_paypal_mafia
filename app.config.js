export default {
    "expo": {
      "name": "radar_paypal_mafia",
      "slug": "radar_paypal_mafia",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/images/check.png",
      "scheme": "myapp",
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
          "foregroundImage": "./assets/images/check.png",
          "backgroundColor": "#ffffff"
        },
        "package": "com.alstudd.radar_paypal_mafia",
        "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
      },
      "web": {
        "bundler": "metro",
        "output": "server",
        "favicon": "./assets/images/check.png"
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
  