import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mdn.defense.defrecrut',
  appName: 'MDN_RECRUTEMENT',
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
