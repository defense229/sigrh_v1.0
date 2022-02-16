import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.defense.defrecrutv2',
  appName: 'defrecrutmobilev2',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      backgroundColor: '#085A03',
      showSpinner: true,
      spinnerColor: "#FFFFFF",
    }
  }
};

export default config;
